const express = require("express");

const Post = require("../models/Post");

const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {

  try {

    const post =
      await Post.create({

        title: req.body.title,

        content: req.body.content,

        author: req.user.id

      });

    res.status(201).json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/", async (req, res) => {

  const posts =
    await Post.find()
    .populate("author", "name");

  res.json(posts);

});

router.get("/:id", async (req, res) => {

  const post =
    await Post.findById(req.params.id)
    .populate("author", "name");

  res.json(post);

});

router.put("/:id", auth, async (req, res) => {

  const post =
    await Post.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

  res.json(post);

});

router.delete("/:id", auth, async (req, res) => {

  await Post.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Post Deleted"
  });

});

module.exports = router;