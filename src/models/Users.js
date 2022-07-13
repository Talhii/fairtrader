var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');
var Users = sequelize.define('users', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  walletaddress: {
    type: Sequelize.STRING,
    unique: true,
  },
  
  image: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  zipcode: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  language: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  buisnessname: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  website: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  phoneno: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  postaladdress: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  facebook: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  priceperhour: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  providing: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  trustscore: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  email: {
    type: Sequelize.STRING,
    defaultValue : ""
  },
  industry: {
    type: Sequelize.STRING,
    defaultValue: ""
  }

});

module.exports = Users
