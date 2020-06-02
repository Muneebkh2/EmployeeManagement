const models = require('../models/index')

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: models.User,
                key: 'id'
            }
        },
        day: DataTypes.DATE,
        status: DataTypes.BOOLEAN,

    }, {underscored: true});
    Attendance.associate = function (models) {
        Attendance.belongsTo(models.User, { 
            foreignKey: 'user_id', 
            constraints: false,
            as: 'users' 
        });
    };
    return Attendance;
};