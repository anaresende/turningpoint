const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  vat: {
    type: String,
    required: true,
  },
  avatarUrl: String,
});

const User = model("User", userSchema);

module.exports = User;