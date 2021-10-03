const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const MoloniApi = require("../api/moloni");
const nodemailer = require("../config/nodemailer.config");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const router = express.Router();
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, username, vat } = req.body;

  if (email === "" || password === "" || username === "" || vat === "") {
    res.status(400).json({
      message:
        "Por favor indique um endereço de email, uma password, um nome de ultilizador e o número de contribuinte.",
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res
      .status(400)
      .json({ message: "Por favor indique um endereço de e-mail." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "A password tem de ter no mínimo 6 caracteres e conter maíusculas e minusculas. ",
    });
    return;
  }

  User.findOne({ vat })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "O utilizador já existe." });
        return;
      }

      // check if User is in Moloni
      // MoloniApi.getByVat(vat).then((response) => {
      //   console.log(response);
      //   res.status(200).json(response.data);
      // });

      // If VAT is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword, username, vat });
    })
    .then((createdUser) => {
      console.log("createdUser", createdUser);
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, username, _id } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, username, _id };

      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let token = "";

      for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
      }

      createdUser.confirmationCode = token;
      console.log("criado mas não guardado");
      createdUser.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("gravado mas não enviado");
        // res.send({
        //   message: "User was registered successfully! Please check your email",
        // });

        console.log(
          "========chegou aqui",
          user.username,
          user.email,
          createdUser.confirmationCode
        );

        nodemailer.sendConfirmationEmail(
          user.username,
          user.email,
          createdUser.confirmationCode
        );

        console.log("are you sending?");

        return;
      });

      res.status(201).json({ user: user });
      return;
      // Send a json response containing the user object
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    });
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  // Check if email or password are provided as empty string
  if (username === "" || password === "") {
    res.status(400).json({
      message: "Por favor indique o seu nome de utilizador e password.",
    });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "Utilizador não encontrado." });
        return;
      }

      console.log("encontrou o user", foundUser);

      if (foundUser.status != "Active") {
        return res.status(401).json({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, username } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, username };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res
          .status(401)
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
        console.log("foi saved", err);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res
          .status(200)
          .json({ message: "Autenticação concluída! Por favor faça login." });
      });
    })
    .catch((e) => console.log("error", e));
  return;
});

module.exports = router;
