require("dotenv").config();
require("./db");

const createError = require("http-errors");

const express = require("express");
const app = express();

require("./config")(app);

const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));

// routes

const userRouter = require("./routes/user.routes");
app.use("/api/user", userRouter);

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const adminRouter = require("./routes/admin.routes");
app.use("/api/admin", adminRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"), (err) => {
    if (err) {
      res.status(500).send(__dirname);
    }
  });
});

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
