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
  customer_id: {
    type: Number,
    required: true,
  },
  avatarUrl: String,
  status: {
    type: String,
    enum: ["Pending", "Active", "Disabled"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
