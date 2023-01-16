const express = require("express");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const secret = "PASSWORD";

const app = express();

app.use(express.json());

app.post("/register", body("email").isEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                status: "Failed",
                error
            });
        }
        const users = await User.findOne({ email:req.body.email });
        if (users) {
            return res.status(400).json({
                status: "Failed",
                massage: "Email alreay exists"
            });
        }
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    massage: err   
                });
            }
            const data = await User.create({ 
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            return res.status(200).json({
                status: "Success",
                massage: "User registered Successfully",
                data
            });
        })
    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            massage: "Registration Failed"
        });
    }
});

app.post("/login",body("email").isEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                status: "Failed",
                massage: error
            });
        }
        const users = await User.findOne({ email: req.body.email });
        if (!users) {
            return res.status(400).json({
                status: "Failed",
                massage: "Email not registered"
            });
        }
        bcrypt.compare(req.body.password, users.password, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    massage: err.massage
                });
            }
            if (result) {
                const token = jwt.sign({
                    data: users.id,
                    email: users.email
                }, secret);
                return res.status(200).json({
                    status: "Success",
                    massage: "Login Success",
                    token
                });
            } else {
                return res.status(400).json({
                    status: "Failed",
                    massage: "Invalid password"
                });
            }
        })
    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            massage: "Login Failed"
        });
    }
})

module.exports = app;
