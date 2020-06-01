const messages = require('../config/messages')
const bcrypt = require('bcryptjs')
const models = require('../models/index')
const mailer = require('../utils/mailer');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../config/jwtConfig').jwtSecret;
const UIDGenerator = require('uid-generator');


module.exports = {

    // Login User
    login: function (req, res, next) {
        models.User.findOne(
            { where: { email: req.body.email } }
        ).then(user => {
            //     if (user == null) {
            //         res.status(messages.AUTHENTICATION_FAILED.code).send(messages.AUTHENTICATION_FAILED);
            //         res.end();
            //     } else {
            //         // User info to send
            //         const UserInfo = {
            //             id: user.id,
            //             name: user.name,
            //             email: user.email,
            //             // profile_picture: user.profile_picture,
            //             role: user.role_id,
            //             // company: user_company.dataValues.company_id
            //         };
            //         res.status(messages.SUCCESSFUL.code).send({
            //             auth: true,
            //             // token: token,
            //             user: UserInfo,
            //             message: 'Successfully Logged in',
            //         });
            //     }
            // })
            // Check if record not exists
            if (user == null) {
                res.status(messages.AUTHENTICATION_FAILED.code).send(messages.AUTHENTICATION_FAILED);
                res.end();
            }
            // Check password
            bcrypt.compare(req.body.password, user.password,
                function (err, user_auth) {
                    if (user_auth) {
                        //         // Passwords match

                        //         // Check if user is activated
                        //         // if (!user.is_active) {
                        //         //     res.status(messages.NOT_ACTIVE.code).send(messages.NOT_ACTIVE);
                        //         //     return next;
                        //         // }

                        const token = jwt.sign(
                            {
                                email: user.email,
                                // company: user_company.dataValues.company_id,
                                name: user.name,
                                // profile_picture: user.profile_picture,
                                role: user.role_id
                            }, jwtSecret);

                        // User info to send
                        const UserInfo = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            // profile_picture: user.profile_picture,
                            role: user.role_id,
                            // company: user_company.dataValues.company_id
                        };
                        res.status(messages.SUCCESSFUL.code).send({
                            auth: true,
                            token: token,
                            user: UserInfo,
                            message: 'Successfully Logged in',
                        });
                        //         // Get company of user to store in token
                        // models.User_Company.findOne(
                        //     {
                        //         where: {
                        //             user_id: user.id
                        //         }
                        //     }
                        // ).then(user_company => {
                        //     const token = jwt.sign(
                        //         {
                        //             email: user.email,
                        //             // company: user_company.dataValues.company_id,
                        //             name: user.name,
                        //             // profile_picture: user.profile_picture,
                        //             role: user.role
                        //         }, jwtSecret);

                        //     // User info to send
                        //     const UserInfo = {
                        //         id: user.id,
                        //         name: user.name,
                        //         email: user.email,
                        //         // profile_picture: user.profile_picture,
                        //         role: user.role,
                        //         // company: user_company.dataValues.company_id
                        //     };
                        //     res.status(messages.SUCCESSFUL.code).send({
                        //         auth: true,
                        //         token: token,
                        //         user: UserInfo,
                        //         message: 'Successfully Logged in',
                        //     });
                        // });

                    } else {
                        // Passwords don't match
                        res.status(messages.AUTHENTICATION_FAILED.code).send(messages.AUTHENTICATION_FAILED);
                    }
                });
        }).catch(err => {
            res.status(messages.INTERNAL_SERVER_ERROR.code).send(messages.INTERNAL_SERVER_ERROR);
        })
    },

    // send forgot Password email
    forgotPasswordEmail: (req, res, next) => {
        const email = req.body.email
        if (email == null) {
            res.status(401).send("Please enter your email");
            res.end()
        }
        models.User.findOne({ where: { email: req.body.email } }).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.AUTHENTICATION_FAILED.code).send(messages.AUTHENTICATION_FAILED);
                res.end();
            } else {
                // Generate random token for verifying a user email
                const uidgen = new UIDGenerator
                let token = uidgen.generateSync()

                models.User.update({
                    remember_token: token
                }, { where: { id: user.dataValues.id } }).then(result => {
                    // Send email for forgot password
                    let subject = 'Reset Password Email | ' + process.env.APP_NAME;
                    let body = 'Dear user, Reset your password by clicking ' +
                        'on the following link: http://' + process.env.CLIENT_URL + '/reset-password/' + token;
                    mailer.send(email, subject, body);

                    res.status(messages.SUCCESSFUL_EMAIL_SENT.code).send(messages.SUCCESSFUL_EMAIL_SENT);
                    res.end();
                }).catch(err => {
                    console.log('Error: ', err);
                });
            }
        })
    },

    // reset forgot Password
    forgotPassword: (req, res, next) => {
        const token = req.body.token;
        let password = req.body.password
        let confirm_password = req.body.confirm_password

        models.User.findOne(
            { where: { remember_token: token } }
        ).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.AUTHENTICATION_FAILED.code).send(messages.AUTHENTICATION_FAILED);
                res.end();
            } else {
                if (password == null && confirm_password == null && password != confirm_password) {
                    res.status(409).send("Password & Confirm Password Must match & Required");
                    res.end();
                } else {
                    // Hash password
                    const hash = bcrypt.hashSync(req.body.password, 10);
                    // Update User Token
                    models.User.update(
                        { password: hash, remember_token: null },{
                            where: { id: user.dataValues.id }
                        }
                    ).then(result => {
                        res.status(messages.SUCCESSFUL_UPDATE.code).send(messages.SUCCESSFUL_UPDATE);
                        res.end();
                    }).catch(err => {
                        console.log('Error: ', err);
                    });
                }
            }
        })
    }

}