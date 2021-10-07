const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const MoloniApi = require("../api/moloni");
const sendConfirmationEmail = require("../config/nodemailer.config");
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const router = express.Router();
const saltRounds = 10;

router.post("/signup", fileUploader.single("avatarUrl"), (req, res, next) => {
  const { email, password, username, vat, danceClass } = req.body;
  const avatarUrl = req.file?.path;
  console.log("------------------------------------", avatarUrl);

  if (email === "" || password === "" || username === "" || vat === "") {
    return res.status(500).json({
      message:
        "Por favor indique um endereço de email, uma password, um nome de ultilizador e o número de contribuinte.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(500)
      .json({ message: "Por favor indique um endereço de e-mail." });
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(500).json({
      message:
        "A password tem de ter no mínimo 6 caracteres e conter maíusculas e minusculas. ",
    });
  }

  return User.findOne({ vat })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(500).json({
          message: "O utilizador já existe.",
        });
      }
      console.log("check in moloni", foundUser);

      // check if User is in Moloni
      return MoloniApi.getByVat(vat)
        .then((response) => {
          if (response.data.length === 0) {
            return res.status(500).json({
              message: "O utilizador não está registado na escola.",
            });
          }
          const moloniUser = response.data[0];

          if (
            email !== moloniUser.email &&
            email !== moloniUser.contact_email
          ) {
            return res.status(500).json({
              message: "Este email não se encontra registado na escola.",
            });
          }

          let danceClassesIds = null;
          if (danceClass !== "") {
            danceClassesIds = danceClass.split(",");
          }

          // If VAT is unique, proceed to hash the password
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);

          const characters =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let emailToken = "";

          for (let i = 0; i < 25; i++) {
            emailToken +=
              characters[Math.floor(Math.random() * characters.length)];
          }

          // Create the new user in the database
          // We return a pending promise, which allows us to chain another `then`
          User.create({
            email,
            password: hashedPassword,
            username,
            vat,
            danceClass: danceClassesIds,
            avatarUrl,
            customer_id: moloniUser.customer_id,
            confirmationCode: emailToken,
            address: moloniUser.address,
            city: moloniUser.city,
            phone: moloniUser.phone,
          })
            .then((newUser) => {
              sendConfirmationEmail(
                newUser.username,
                newUser.email,
                newUser.confirmationCode
              );
              res.status(201).json({ user: newUser });
            })
            .catch((err) => {
              console.log(err);
              return res
                .status(500)
                .json({ message: "Não foi possivel criar o utilizador" });
            });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Internal Server Error on connection with API" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  // Check if email or password are provided as empty string
  if (username === "" || password === "") {
    return res.status(500).json({
      message: "Por favor indique o seu nome de utilizador e password.",
    });
  }

  // Check the users collection if a user with the same email exists
  return User.findOne({ username })
    .populate("danceClass")
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        return res.status(500).json({ message: "Utilizador não encontrado." });
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (foundUser.status != "Active") {
        return res.status(500).json({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      // Compare the provided password with the one saved in the database

      if (passwordCorrect) {
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
        } = foundUser;

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
      } else {
        return res
          .status(500)
          .json({ message: "Não foi possível autenticar o utilizador." });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`/verify req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

router.get("/confirm/:confirmationCode", (req, res, next) => {
  console.log("entrou no processo confirm", req.params.confirmationCode);
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        return res
          .status(200)
          .json({ message: "Autenticação concluída! Por favor faça login." });
      });
    })
    .catch((e) => console.log("error", e));
});

module.exports = router;
