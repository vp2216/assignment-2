const express = require("express");
const User = require("../Models/user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {});

module.exports = app;
