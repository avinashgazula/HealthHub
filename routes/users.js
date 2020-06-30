const express = require("express");
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');

router.get("/login", (req, res) => {
    res.send("login");
})

router.get("/register", (req, res) => {
    res.send("register");
})

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(200).json({
                    success: false,
                    error: 'User already exists'
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt((err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    id: newUser._id
                                })
                            })
                            .catch(err => console.log(err))
                    });
                })


            }
        })

})

module.exports = router;