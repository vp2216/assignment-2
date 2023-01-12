const express = require("express");
const db = require("mongoose");
const PORT = 3000

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
})

db.connect(
  "mongodb://localhost/",() => console.log("connected to DB")
);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));