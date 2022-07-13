var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Users = require('./Users')


var Contracts = sequelize.define('contracts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  termsandconditionsfile: Sequelize.JSON,
  warrantyfile: Sequelize.JSON,
  responsetime: Sequelize.STRING,
  attachfiles: Sequelize.JSON,
  apealtime: Sequelize.STRING,
  ftpterms: Sequelize.STRING,
  applytoallinvoices: Sequelize.STRING,


});

Contracts.belongsTo(Users, {
  foreignKey: "sellerid",
  targetKey: "id",
});

Contracts.belongsTo(Users, {
  foreignKey: "buyerid",
  targetKey: "id",
});

module.exports = Contracts
