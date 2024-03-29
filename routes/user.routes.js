const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MoloniApi = require("../api/moloni");
const Goal = require("../models/goalmodel");
const DanceClass = require("../models/danceclassmodel");
const MediaContent = require("../models/mediacontentmodel");
const User = require("../models/usermodel");
const fileUploader = require("../config/cloudinary.config");

const saltRounds = 10;

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

router.get("/my-goals", isAuthenticated, (req, res) => {
  const user = req.payload;

  return Goal.find({ user: user._id })
    .then((goals) => {
      return res.status(201).json(goals);
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/my-invoices", isAuthenticated, (req, res) => {
  const user = req.payload;

  return MoloniApi.getInvoices(user.customer_id)
    .then((response) => {
      const documents = response.data;

      const documentsInfo = documents.map((document) => {
        return {
          document_id: document.document_id,
          date: document.date.slice(0, 10),
          value: `${document.net_value}€`,
        };
      });

      return res.status(200).json(documentsInfo);
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/download-document/:documentId", isAuthenticated, (req, res) => {
  const user = req.payload;
  const { documentId } = req.params;

  return MoloniApi.getPDFLink(documentId)
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.post("/add-my-goal", (req, res) => {
  const { title, plan, user } = req.body;

  if (title === "" || plan === "") {
    res.status(400).json({
      message: "Por favor coloca o teu objectivo e o plano para alcançá-lo.",
    });
    return;
  }

  return Goal.create({ title, plan, user })
    .then((goal) => {
      res.status(201).json({ goal });
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.post("/edit-my-goal", isAuthenticated, (req, res) => {
  const { title, plan, _id } = req.body;
  const user = req.payload;

  if (title === "" || plan === "") {
    return res.status(400).json({
      message: "Por favor coloca o teu objectivo e o plano para alcançá-lo.",
    });
  }

  return Goal.findById(_id)
    .then((goal) => {
      if (user._id == goal.user) {
        goal.title = title;
        goal.plan = plan;
        return goal
          .save()
          .then(() => {
            res.status(201).json({ goal });
          })
          .catch((error) =>
            res.status(500).json({ message: "Internal Server Error" })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "Internal Server Error" })
    );
});

router.post("/delete-my-goal", isAuthenticated, (req, res) => {
  const { title, plan, _id } = req.body;
  const user = req.payload;

  if (title === "" || plan === "") {
    return res.status(400).json({
      message: "Por favor coloca o teu objectivo e o plano para alcançá-lo.",
    });
  }

  return Goal.findById(_id)
    .then((goal) => {
      if (user._id == goal.user) {
        return goal
          .remove()
          .then(() => {
            res.status(201).json({ goal });
          })
          .catch((error) =>
            res.status(500).json({ message: "Internal Server Error" })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "Internal Server Error" })
    );
});

/* GET users listing. */
router.get("/get-customer/:vat", (req, res, next) => {
  const { vat } = req.params;

  return MoloniApi.getByVat(vat).then((response) => {
    if (response.data.length === 0) {
      return res.status(400).json({ message: "no customer" });
    } else {
      return res.status(200).json(response.data);
    }
  });
});

router.get("/count", (req, res, next) => {
  return MoloniApi.getCountClients()
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/classes", (req, res) => {
  return DanceClass.find()
    .then((classes) => res.status(201).json(classes))
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

// just to populate my database with some dance style classes
router.get("/add-my-class", (req, res) => {
  return DanceClass.create({ style: "ballet", level: "grade 5" })
    .then((danceClass) => res.status(201).json({ danceClass }))
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/dance-class/:danceClassId", isAuthenticated, (req, res, next) => {
  const { danceClassId } = req.params;

  return DanceClass.find({ _id: danceClassId })
    .then((danceClass) => {
      return MediaContent.find({
        danceClass: danceClassId,
      })
        .populate("danceClass")
        .then((media) => {
          return res.status(200).json({ media, danceClass: danceClass[0] });
        })
        .catch((err) => {
          return res.status(500).json({ message: "Internal Server Error" });
        });
    })
    .catch((err) => {
      return { message: "not found classes" };
    });
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post(
  "/edit/:userId",
  fileUploader.single("avatarUrl"),
  (req, res, next) => {
    const { username, oldPassword, newPassword, danceClass } = req.body;
    const avatarUrl = req.file?.path;
    const { userId } = req.params;

    // Check if email or password are provided as empty string
    if (username === "") {
      return res.status(500).json({
        message: "Por favor indique o seu nome de utilizador.",
      });
    }

    // Check the users collection if a user with the same email exists
    return User.findOne({ _id: userId })
      .populate("danceClass")
      .then((foundUser) => {
        if (!foundUser) {
          // If the user is not found, send an error response
          return res
            .status(500)
            .json({ message: "Utilizador não encontrado." });
        }

        if (oldPassword !== "" && newPassword !== "") {
          const passwordCorrect = bcrypt.compareSync(
            oldPassword,
            foundUser.password
          );

          if (passwordCorrect) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

            foundUser.password = hashedNewPassword;
          } else {
            return res.status(500).json({ message: "Password Incorreta" });
          }
        }

        if (avatarUrl) {
          foundUser.avatarUrl = avatarUrl;
        }

        let danceClassesIds = null;
        if (danceClass !== "") {
          danceClassesIds = danceClass.split(",");
        }

        foundUser.username = username;
        foundUser.danceClass = danceClassesIds;
        foundUser.save((err, userSaved) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          return User.findOne({ _id: userSaved._id })
            .populate("danceClass")
            .then((userPopulated) => {
              // Deconstruct the user object to omit the password
              const {
                _id,
                username,
                customer_id,
                email,
                avatarUrl,
                role,
                danceClass,
                address,
                city,
                phone,
              } = userPopulated;

              // Create an object that will be set as the token payload
              const payload = {
                _id,
                username,
                customer_id,
                email,
                avatarUrl,
                role,
                danceClass,
                address,
                city,
                phone,
              };

              // Create and sign the token
              const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
                algorithm: "HS256",
                expiresIn: "6h",
              });

              // Send the token as the response
              return res.status(200).json({ authToken: authToken });
            })
            .catch((e) =>
              res.status(500).json({ message: "Internal Server Error" })
            );
        });
      })
      .catch((e) => res.status(500).json({ message: "Internal Server Error" }));
  }
);

module.exports = router;
