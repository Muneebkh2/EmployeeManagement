const express = require('express');
const router = express.Router();
const authModel = require('../model/Auth-model');
const bcrypt = require('bcrypt');

const passport = require('passport');
const JWT = require('jsonwebtoken')

router.post('/signup', (req, res) => {
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        req.body.password = hash;
        authModel.signUp(req.body, function (err, result) {
            res.json({ data: result, error: err })
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (!err) {
            return next(err)
        }
        if (!user) {
            return res.status(500).json(info.message)
        }

        const payload = {
            username: user.username,
            email: user.email,
        };

        const options = {
            sub: `${user.id}`,
            expiresIn: 900
        };

        const token = JWT.sign(payload, 'secret123', options);
        res.send({ token })
    })(req, res, next)
})

module.exports = router