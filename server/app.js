require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));

// routes

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
