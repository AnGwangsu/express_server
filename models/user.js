'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    socialType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};