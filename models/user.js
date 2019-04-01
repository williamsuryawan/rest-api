'use strict';
const bcrypt = require ('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate (function (user, options) {
    const saltRounds = 5
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashed = bcrypt.hashSync(user.password, salt)
    user.password = hashed
  });
  return User;
};