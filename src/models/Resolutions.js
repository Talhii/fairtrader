var Sequelize = require('sequelize');
// importing connection database

var sequelize = require('../database');
var Invoices = require('./Invoices');


var Resolutions = sequelize.define('resolution', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  resolution: Sequelize.STRING,
  friendsemail: Sequelize.STRING,
  mediator : Sequelize.STRING
  
});

Resolutions.belongsTo(Invoices);
Invoices.hasOne(Resolutions)

module.exports = Resolutions
