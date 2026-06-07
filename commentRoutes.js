const express = require("express");

const Comment =
require("../models/Comment");

const auth =
require("../middleware/auth");

const router =
express.Router();

router.post(
  "/:postId",
  auth,
  async (req, res) => {

    const comment =
      await Comment.create({

        text:
          req.body.text,

        user:
          req.user.id,

        post:
          req.params.postId

      });

    res.json(comment);

  }
);

router.get(
  "/:postId",
  async (req, res) => {

    const comments =
      await Comment.find({

        post:
          req.params.postId

      })
      .populate(
        "user",
        "name"
      );

    res.json(comments);

  }
);

router.delete(
  "/:id",
  auth,
  async (req, res) => {

    await Comment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Comment Deleted"
    });

  }
);

module.exports = router;