const messages = require('../config/messages')
const bcrypt = require('bcryptjs')
const models = require('../models/index')

const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../config/jwtConfig').jwtSecret;


module.exports = {

    // Login User
    login: function (req, res, next) {
        // Log request
        console.log('Login user request');
        // return res.status(200).send(req.body);
        // Get user by email
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
            // Check if record exists
            if (user == null) {
                res.status(messages.AUTHENTICATION_FAILED.code).send(messages.AUTHENTICATION_FAILED);
                res.end();
            }
            // Check password
            bcrypt.compare(req.body.password, user.password, function (err, user_auth) {
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
        })
            .catch(err => {
                console.log('Error in finding user when logging in');
                res.status(messages.INTERNAL_SERVER_ERROR.code).send(messages.INTERNAL_SERVER_ERROR);
            })
    },

}