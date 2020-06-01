'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersInfo = sequelize.define('UsersInfo', {
    user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    designation: DataTypes.STRING
  }, { freezeTableName: true });
  UsersInfo.associate = function (models) {
    UsersInfo.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'users' 
    });
  };
  return UsersInfo;
};