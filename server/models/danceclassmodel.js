const { Schema, model } = require("mongoose");

const danceClassSchema = new Schema({
  style: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
});

const DanceClass = model("DanceClass", danceClassSchema);

module.exports = DanceClass;
