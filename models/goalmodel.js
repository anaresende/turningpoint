const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;
