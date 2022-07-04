var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: Sequelize.STRING,
  country: Sequelize.STRING,
  city: Sequelize.STRING,
  zipcode: Sequelize.BIGINT,
  language: Sequelize.STRING,
  email: Sequelize.STRING,
  industry: Sequelize.STRING,
  
});

module.exports = Users
