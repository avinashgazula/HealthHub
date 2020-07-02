const express = require("express");
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

const { verifyToken } = require('../config/auth');
const { JWT_SECRET } = require("../config/keys");

module.exports = (passport, jwt) => {
    router.post("/register", (req, res) => {
        const { type, name, email, password } = req.body;

        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    return res.status(200).json({
                        success: false,
                        error: 'Email is already in use'
                    })
                } else {
                    const newUser = new User({
                        type,
                        name,
                        email,
                        password
                    });
                    bcrypt.genSalt((err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) console.error(err);
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
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (user) {
                jwt.sign({ user }, JWT_SECRET, (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        success: true,
                        user: { ...user._doc, password: undefined },
                        token
                    });
                })

            } else {
                res.status(401).json({
                    success: false,
                    message: info.message
                });
            }
        })(req, res, next);
    });

    router.get('/logout', verifyToken, (req, res) => {
        jwt.verify(req.token, JWT_SECRET, (err, authData) => {
            if (err) res.sendStatus(403);
            else {
                jwt.
                    res.status(200).json({
                        success: true,
                        authData
                    })
            }
        })
        req.logout();
        res.sendStatus(200);
    });

    return router;
}

