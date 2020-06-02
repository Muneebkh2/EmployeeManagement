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
        let dates_array = req.body.dates_marked
        // const date = req.body.date
        // const status = req.body.status

        if (dates_array == null) {
            res.status(401).send("date and status is required.");
            res.end()
        } else {
            models.User.findOne({ where: { role_id: 3, id: userId } }).then(employee => {
                // Check if record not exists
                if (employee == null) {
                    res.status(messages.NOT_FOUND.code).send(messages.NOT_FOUND);
                    res.end();
                } else {
                    // delete old_dates
                    models.Attendance.destroy({
                        where: { user_id: userId }
                    }).then(() => {
                        // insert dates
                        dates_array.forEach(element => {

                            console.log("Date: ", element.date);
                            console.log("Status: ", element.date);

                            models.Attendance.create({
                                user_id: userId,
                                day: element.date,
                                status: element.status
                            }).then(result => {
                                res.status(messages.SUCCESSFUL.code).json({message: messages.SUCCESSFUL});
                            }).catch(err => {
                                console.log('Error: ', err);
                            });
                        });

                    }).catch(err => {
                        console.log('Error: ', err);
                    });
                }
            })
        }
    },

    // helper methods
    // INSERT_DATES: (value, id, res) => {
    //     value.forEach(element => {
    //         models.Attendance.create({
    //             user_id: id,
    //             day: new Date(element[date]),
    //             status: element[status]
    //         }).then(result => {
    //             res.status(messages.SUCCESSFUL.code).send(messages.SUCCESSFUL);
    //             res.end();
    //         }).catch(err => {
    //             console.log('Error: ', err);
    //         });
    //     });
    // },
    // DELETE_DATES: (id, res) => {
    //     models.Attendance.destroy({
    //         where: { id: id }
    //     }).then((attendance) => {
    //         if (attendance == null) {
    //             res.status(messages.USER_NOT_FOUND.code).send(messages.USER_NOT_FOUND)
    //             res.end()
    //         } else {
    //             res.status(messages.SUCCESSFUL_DELETE.code).send(messages.SUCCESSFUL_DELETE);
    //         }
    //     }).catch(err => {
    //         console.log('Error: ', err);
    //     });
    // },
}