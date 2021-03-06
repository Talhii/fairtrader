var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Invoices = sequelize.define('invoices', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sellerwalletaddress : Sequelize.STRING,
  invoicenumber: {
    type: Sequelize.BIGINT,
    unique: true
  },
  customername: Sequelize.STRING,
  customeraddress: Sequelize.STRING,
  customeremail: Sequelize.STRING,
  invoicefile : Sequelize.STRING,
  payment : Sequelize.STRING,

});

module.exports = Invoices
