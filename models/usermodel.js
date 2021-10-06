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
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  danceClass: [{ type: Schema.Types.ObjectId, ref: "DanceClass" }],
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
