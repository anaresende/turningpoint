const express = require("express");

const User = require("../models/usermodel");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const fileUploader = require("../config/cloudinary.config");
const DanceClass = require("../models/danceclassmodel");
const MediaContent = require("../models/mediacontentmodel");

const router = express.Router();

router.get("/", isAuthenticated, async (req, res, next) => {
  const user = req.payload;

  if (user.role !== "admin") {
    return res.status(401).json({
      message: "Permissão só para o Admin",
    });
  }

  const classes = await DanceClass.find()
    .then((classes) => {
      return classes;
    })
    .catch((err) => {
      return { message: "not found classes" };
    });

  const media = await MediaContent.find()
    .populate("danceClass")
    .then((media) => {
      return media;
    })
    .catch((err) => {
      return { message: "not found media" };
    });

  res.status(200).json({ user, classes, media });
});

router.post(
  "/add-media-content",
  fileUploader.single("fileUrl"),
  (req, res, next) => {
    const { danceClass, title } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "You need to select a media file" });
      return;
    }

    const fileUrl = req.file?.path;
    const fileType = req.file?.mimetype;

    MediaContent.create({
      fileUrl: fileUrl,
      fileType: req.file.mimetype,
      danceClass: danceClass,
      title: title,
    })
      .then((media) => {
        res.status(201).json({ media });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Media not added" });
      });
  }
);

router.post("/delete-media", isAuthenticated, (req, res) => {
  const { _id } = req.body;

  MediaContent.findById(_id)
    .then((media) => {
      media
        .remove()
        .then(() => {
          res.status(201).json({ media });
        })
        .catch((error) => {
          res.status(400).json({ message: "Media not deleted" });
        });
    })
    .catch((error) => {
      res.status(400).json({ message: "Media not found" });
    });
});

module.exports = router;
