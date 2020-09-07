const bcrypt = require('bcryptjs');

const jwtSecret = require('./jwtConfig').jwtSecret;
const BCRYPT_SALT_ROUNDS = 12;

// const log = require('../utils/logger');/

const passport = require('passport'),
    User = require('../models').User,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret,
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    email: jwt_payload.email,
                },
            }).then(userData => {
                if (userData) {
                    console.log('user found in db in passport');
                    let user = {
                        id: userData.id,
                        email: userData.email,
                        // company_id: jwt_payload.company,
                        role: userData.role_id,
                        name: userData.name,
                        // profile_picture: userData.profile_picture
                    };
                    console.log(user);
                    // note the return removed with passport JWT - add this return for passport local
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);