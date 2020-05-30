'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    designation: DataTypes.STRING
  }, {});
  Employee.associate = function (models) {
    // associations can be defined here
    Employee.hasOne(models.Employee, {
      foreignKey: 'user_id',
      as: 'users',
      onDelete: 'CASCADE'
    })
  };
  return Employee;
};