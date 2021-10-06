const express = require("express");
const router = express.Router();
const MoloniApi = require("../api/moloni");
const Goal = require("../models/goalmodel");
const DanceClass = require("../models/danceclassmodel");
const MediaContent = require("../models/mediacontentmodel");

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
  const user = req.payload;
  const { danceClassId } = req.params;

  return MediaContent.find({
    danceClass: danceClassId,
  })
    .populate("danceClass")
    .then((media) => {
      return res.status(200).json(media);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = router;
