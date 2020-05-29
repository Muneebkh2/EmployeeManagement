//  Imports Files...
const messages = require('../config/messages')
const bcrypt = require('bcryptjs')
const validator = require('../utils/validator').User
const models = require('../models/index')

'use strict';
module.exports = {
    // get all admin
    getAllAdmin: (req, res) => {
        models.User.findAll().then(
            user => {
                res.status(messages.SUCCESSFUL.code).send(user);
            }
        )
    },
    // create admin
    createAdmin: (req, res) => {
        // console.log("create Admin Working")
        // Validate request
        let validate = validator(req)
        validate.check().then((matched) => {
            if (!matched) {
                // Send error in response if invalid data
                res.status(409).send(validate.errors)
                res.end()
            }

            // Hash password
            const hashPassword = bcrypt.hashSync(req.body.password, 10);
            models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                role_id: 2
            }).then((user) => {
                res.status(messages.SUCCESSFUL_CREATE.code).send(messages.SUCCESSFUL_CREATE);
            })

        })
    },
    // update admin
    updateAdmin: (req, res) => {
        // Validate request
        let validate = validator(req)
        validate.check().then((matched) => {
            if (!matched) {
                // Send error in response if invalid data
                res.status(409).send(validate.errors)
                res.end()
            }

            models.User.findByPk(req.params.id).then(user => {
                // Check if record not exists
                if (user == null) {
                    res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND);
                    res.end();
                }

                // Hash password
                const hashPassword = bcrypt.hashSync(req.body.password, 10);
                models.User.update({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword,
                    role_id: 2,
                    updatedAt: new Date()
                }, { where: {id: req.params.id} }).then((user) => {
                    res.status(messages.SUCCESSFUL_UPDATE.code).send(messages.SUCCESSFUL_UPDATE);
                })
            });

        })
    },
    // delete admin
    deleteAdmin: (req, res) => {
        models.User.findByPk(req.params.id).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND);
                res.end();
            }

            models.User.destroy({
                where: {
                  id: req.params.id
                }
              }).then((user) => {
                res.status(messages.SUCCESSFUL_DELETE.code).send(messages.SUCCESSFUL_DELETE);
            })

        });   
    }
}