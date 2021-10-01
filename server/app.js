require("dotenv").config();
require("./db/index");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
require("./config")(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client", "build")));

// routes

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

module.exports = app;
