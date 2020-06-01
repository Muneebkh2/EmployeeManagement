//  Imports Files...
const messages = require('../config/messages')
const bcrypt = require('bcryptjs')
const validator = require('../utils/validator')
const models = require('../models/index')

'use strict';
module.exports = {
    // get Employee by id
    getEmployeeById: (req, res) => {
        const userId = req.params.id;
        models.User.findByPk(userId).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND);
                res.end();
            }

            models.UsersInfo.findOne({ 
                where: { user_id: userId }, 
                include: [{ model: models.User, as: 'users' }] 
            }).then(
                employee => {
                    res.status(messages.SUCCESSFUL.code).send(employee);
                }
            )

        });
    },
    // get all employees
    getAllEmployees: (req, res) => {
        models.UsersInfo.findAll({ include: [{ model: models.User, as: 'users' }] }).then(
            employees => {
                res.status(messages.SUCCESSFUL.code).send(employees);
            }
        )
    },
    // create employee
    createEmployee: (req, res) => {
        // Validate request
        let validate = validator.InsertEmployee(req)
        validate.check().then((matched) => {
            if (!matched) {
                // Send error in response if invalid data
                res.status(409).send(validate.errors)
                res.end()
            }

            // Hash password
            const hashPassword = bcrypt.hashSync(req.body.name, 10);
            models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                role_id: 3,
                UsersInfo: {
                    phone: req.body.phone,
                    address: req.body.address,
                    designation: req.body.designation,
                }
            }, {
                include: {
                    model: models.UsersInfo,
                    as: 'UsersInfo'
                }
            }).then((user) => {
                res.status(messages.SUCCESSFUL_CREATE.code).send(messages.SUCCESSFUL_CREATE);
            })

        })
    },
    // update admin
    updateEmployee: (req, res) => {

        const userId = req.params.id;
        // Validate request
        let validate = validator.updateEmployee(req)
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
                models.User.update({
                    name: req.body.name,
                    email: req.body.email,
                    updatedAt: new Date(),
                }, { where: { id: userId } }).then((user) => {
                    models.UsersInfo.update({
                        phone: req.body.phone,
                        address: req.body.address,
                        designation: req.body.designation,
                        updatedAt: new Date(),
                    }, { where: { user_id: userId } }).then(() => {
                        res.status(messages.SUCCESSFUL_UPDATE.code).send(messages.SUCCESSFUL_UPDATE);
                    })
                });

            });

        })
    },
    // delete employee
    deleteEmployee: (req, res) => {
        const userId = req.params.id;
        models.User.findByPk(userId).then(user => {
            // Check if record not exists
            if (user == null) {
                res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND);
                res.end();
            }

            models.User.destroy({
                where: { id: userId }, 
                cascade: true, 
                include: [{ model: models.UsersInfo, as: 'users', cascade: true, }]
            }).then((user) => {
                res.status(messages.SUCCESSFUL_DELETE.code).send(messages.SUCCESSFUL_DELETE);
            })

        });
    }
}