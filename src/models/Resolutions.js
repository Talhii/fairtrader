var Sequelize = require('sequelize');
// importing connection database

var sequelize = require('../database');
var Invoices = require('./Invoices');


var resolution = sequelize.define('resolution', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  resolution: Sequelize.STRING,
  friendsemail: Sequelize.STRING,
  mediator : Sequelize.STRING
  
});

resolution.belongsTo(Invoices, {
  foreignKey: "foreign_id",
  targetKey: "invoicenumber",
});

module.exports = resolution
