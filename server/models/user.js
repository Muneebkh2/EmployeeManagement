'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        remember_token: DataTypes.STRING,
        role_id: DataTypes.INTEGER,
    }, {});
    User.associate = function (models) {
        // User has one role
        User.hasOne(models.Role, {
            foreignKey: 'role_id',
            as: 'roles',
            onDelete: 'CASCADE'
        })
        // users has only UsersInfo
        User.hasOne(models.UsersInfo, {
            foreignKey: 'user_id',
            as: 'UsersInfo',
            onDelete: 'CASCADE'
        });
        // users has many attendance
        User.hasMany(models.Attendance, { as: "attendance" })
    };
    return User;
};