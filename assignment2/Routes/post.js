const express = require("express");
const Post = require("../Models/post");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "Success",
      posts,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      massage: e.massage,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json({
      status: "Success",
      massage: "Post added successfully",
      posts,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      massage: e.massage,
    });
  }
});

app.put("/:postId", async (req, res) => {
    try {
        const posts = await Post.updateOne({ _id: req.params.postId }, req.body);
        res.status(200).json({
            status: "Success",
            massage: "Post successfully updated",
            posts
        })
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      massage: e.massage,
    });
  }
});

app.delete("/:postId", async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.postId });
        res.status(200).json({
            status: "Success",
            massage:"Post deleted successfully"
      })
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      massage: e.massage,
    });
  }
});

module.exports = app;
