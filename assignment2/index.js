const express = require("express");
const db = require("mongoose");
const user = require("./Routes/user");
const post = require("./Routes/post");
const PORT = 3000

const app = express();

app.use(express.json());

app.use("/posts",post)
app.use("/",user)

db.connect(
  "mongodb://localhost/assignment",() => console.log("connected to DB")
);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));