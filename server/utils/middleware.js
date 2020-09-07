const jwt = require('jsonwebtoken');
const passport = require('passport');
// const passportJWT = require('passport-jwt');

module.exports.validateToken = function (req,res,next) {
    console.log("asd");
    
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        console.log("2nd check");
        
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(messages.FORBIDDEN.code).send(messages.FORBIDDEN);
        } else {
            next()
        }
    });
}