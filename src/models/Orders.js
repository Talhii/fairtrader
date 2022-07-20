var Sequelize = require('sequelize');
// importing connection database

const Invoices = require('./Invoices');
var sequelize = require('../database');


var Orders = sequelize.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  termsandconditionsfile: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  warrantyfile: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  responsetime: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  attachfiles: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  
  apealtime: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  ftpterms: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  applytoallinvoices: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  sellerwalletaddress: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  customername: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  customeraddress: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  customeremail: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  customerwalletaddress: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  invoicefile: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  payment: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  paidstatus :{
    type : Sequelize.BOOLEAN,
    defaultValue : false
  },


  resolution: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  friendsemail: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  mediator: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

});


Orders.belongsTo(Invoices);
Invoices.hasOne(Orders)


module.exports = Orders
