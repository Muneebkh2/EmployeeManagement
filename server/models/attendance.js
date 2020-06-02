'use strict';
module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        user_id: DataTypes.INTEGER,
        day: DataTypes.DATE,
        status: DataTypes.BOOLEAN
    }, {});
    Attendance.associate = function (models) {
        Attendance.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'users',
            onDelete: 'CASCADE'
        })
    };
    return Attendance;
};