var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Mediators = sequelize.define('mediators', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessName: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      businessWebsite: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      cardNumber: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      passport: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      idCard: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      documents: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      industry: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      facebookLink: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      status:{
        type:DataTypes.INTEGER,
        defaultValue:0
      }

});

module.exports = Users
