const express = require("express");
const db = require("mongoose");
const user = require("./Routes/user");
const post = require("./Routes/post");
const jwt = require("jsonwebtoken");
const PORT = 3000;
const secret = "PASSWORD";

const app = express();

app.use(express.json());

app.use("/posts", (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(500).json({
          status: "Failed",
          massage: err
        });
      }
      req.user = decoded.data;
      next();
    })
  } else {
    res.status(400).json({
      status: "Failed",
      massage: "Unknown user"
    });
  }
})

app.use("/posts",post)
app.use("/",user)

db.connect(
  "mongodb://localhost/assignment",() => console.log("connected to DB")
);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));