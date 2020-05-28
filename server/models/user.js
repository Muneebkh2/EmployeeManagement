'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    remember_token: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    // User has one role
    User.hasOne(models.Role, {
      foreignKey: 'role_id',
      as: 'roles',
      onDelete: 'CASCADE'
    })
  };
  return User;
};