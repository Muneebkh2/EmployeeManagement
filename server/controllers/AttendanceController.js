//  Imports Files...
const messages = require('../config/messages')
const bcrypt = require('bcryptjs')
const validator = require('../utils/validator')
const models = require('../models/index')

'use strict';
module.exports = {
    // mark Attendance of employee
    markAttendance: (req, res) => {
        const userId = req.body.user_id
        const date = req.body.date
        const status = req.body.status

        if (date == null && status == null) {
            res.status(401).send("date and status is required.");
            res.end()
        } else {
            models.User.findOne({ where: { role_id: 3, id: userId } }).then(employee => {
                // Check if record not exists
                if (employee == null) {
                    res.status(messages.NOT_FOUND.code).send(messages.NOT_FOUND);
                    res.end();
                } else {
                    models.Attendance.create({
                        user_id: userId,
                        day: date,
                        status: status
                    }).then(result => {
                        res.status(messages.SUCCESSFUL.code).send(messages.SUCCESSFUL);
                        res.end();
                    }).catch(err => {
                        console.log('Error: ', err);
                    });
                }
            })
        }
    },
}