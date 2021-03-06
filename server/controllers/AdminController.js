//  Imports Files...
const messages = require('../config/messages')
const bcrypt = require('bcryptjs')
const validator = require('../utils/validator')
const models = require('../models/index')

'use strict';
module.exports = {
    // get Admin by id
    getAdminById: (req, res) => {
        const userId = req.params.id;
        models.User.findOne({ where: { role_id : 2, id: userId }}).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND);
                res.end();
            } else {
                res.status(messages.SUCCESSFUL.code).send(user);
            }
        });
    },
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
        // Validate request
        let validate = validator.User(req)
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
        const userId = req.params.id;
        // Validate request
        let validate = validator.updateAdmin(req)
        validate.check().then((matched) => {
            if (!matched) {
                // Send error in response if invalid data
                res.status(409).send(validate.errors)
                res.end()
            }

            models.User.findByPk(userId).then(user => {
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
                }, { where: {id: userId} }).then((user) => {
                    res.status(messages.SUCCESSFUL_UPDATE.code).send(messages.SUCCESSFUL_UPDATE);
                })
            });

        })
    },
    // delete admin
    deleteAdmin: (req, res) => {
        const userId = req.params.id;
        models.User.findByPk(userId).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND);
                res.end();
            }

            models.User.destroy({
                where: { id: userId }
              }).then((user) => {
                res.status(messages.SUCCESSFUL_DELETE.code).send(messages.SUCCESSFUL_DELETE);
            })

        });   
    }
}