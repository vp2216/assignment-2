const express = require("express");
const Post = require("../Models/post");
const User = require("../Models/user");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const currentUser = await User.findOne({ id: req.user });
    const posts = await Post.find({ name: currentUser.name });
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
    const currentUser = await User.findOne({ id: req.user });
    const posts = await Post.create({
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      user: currentUser.name,
    });
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
    const currentUser = await User.findOne({ id: req.user });
    const posts = await Post.updateOne({ _id: req.params.postId,user:currentUser.name }, {
      user:currentUser.name,
      title: req.body.title,
      image:req.body.image,
      body:req.body.body
    });
    if (posts) {
      res.status(200).json({
        status: "Success",
        massage: "Post successfully updated",
        posts,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        massgae:"Cannot update other users post"
      })
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      massage: e.massage,
    });
  }
});

app.delete("/:postId", async (req, res) => {
  try {
    const currentUser = await User.findOne({ id: req.user });
    const posts = await Post.deleteOne({ _id: req.params.postId, user: currentUser.name });
    if (posts) {
      res.status(200).json({
        status: "Success",
        massage: "Post deleted successfully",
      });   
    } else {
      res.status(400).json({
        status: "Failed",
        massage:"Cannot delete post of other users"
      })
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      massage: e.massage,
    });
  }
});

module.exports = app;
