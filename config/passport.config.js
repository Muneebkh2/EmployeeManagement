const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const authModel = require('../app/model/Auth-model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = "secret123";

passport.use(new LocalStrategy(
    {
        usernameField = "username",
        passwordField = "password"
    },
    function (username, password, done) {
        authModel.findOne(username, function (err, result) {
            if (err) return done(err);
            if (result.length === 0) {
                return done(null, false, { message: "Incorrect Username" })
            }
            const user = result[0];
            bcrypt.compare(password, user.password, function (err, result) {
                if (!result) {
                    return done(null, false, { message: "Incorrect Password" })
                }
                return done(null, user)
            })
        })
    }
))

passport.use(new JwtStrategy(options, function (jwtPayload, done) {
    authModel.findById(jwtPayload.sub, function (err, result) {
        if (err) { return done(err, false) }
        if (result.length === 0) { return done(null, false) }

        return done(null, result[0])
    })
}))