'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: DataTypes.STRING
    }, {});
    Role.associate = function (models) {
        // Each user has a role
        Role.belongsTo(models.User, {
            as: 'roles'
        })
    };
    return Role;
};