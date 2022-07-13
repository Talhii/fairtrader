var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Mediators = sequelize.define('mediators', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessName: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      businessWebsite: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      cardNumber: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      passport: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      idCard: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      documents: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      city: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      country: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      language: {
        type: Sequelize.JSON(5555555),
        defaultValue: {}
      },
      industry: {
        type: Sequelize.JSON(5555555),
        defaultValue: {}
      },
      facebookLink: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      status:{
        type:Sequelize.INTEGER,
        defaultValue:0
      }

});

module.exports = Mediators
