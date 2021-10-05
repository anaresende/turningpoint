const { Schema, model } = require("mongoose");

const mediaContentSchema = new Schema({
  danceClass: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "DanceClass",
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const MediaContent = model("MediaContent", mediaContentSchema);

module.exports = MediaContent;
