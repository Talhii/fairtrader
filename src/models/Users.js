var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  walletaddress: {
    type: Sequelize.STRING,
    unique: true
  },
  image: Sequelize.STRING,
  country: Sequelize.STRING,
  city: Sequelize.STRING,
  zipcode: Sequelize.BIGINT,
  language: Sequelize.STRING,
  buisnessname : Sequelize.STRING,
  website : Sequelize.STRING,
  phoneno : Sequelize.BIGINT,
  postaladdress : Sequelize.STRING,
  facebook : Sequelize.STRING,
  priceperhour : Sequelize.BIGINT,
  providing : Sequelize.STRING,
  trustscore: Sequelize.BIGINT,
  email: Sequelize.STRING,
  industry: Sequelize.STRING,

});

module.exports = Users
