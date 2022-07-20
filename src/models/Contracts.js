var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');
const Invoices = require('./Invoices');

var Users = require('./Users')


var Contracts = sequelize.define('contracts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  termsandconditionsfile: Sequelize.STRING,
  warrantyfile: Sequelize.STRING,
  responsetime: Sequelize.STRING,
  attachfiles: Sequelize.STRING,
  apealtime: Sequelize.STRING,
  ftpterms: Sequelize.STRING,
  applytoallinvoices: Sequelize.STRING,


});


Contracts.belongsTo(Invoices);
Invoices.hasOne(Contracts)

module.exports = Contracts
