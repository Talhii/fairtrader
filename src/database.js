var Sequelize = require('sequelize');

const database = new Sequelize(
  'fairtrader', // name database
  'root', // user database
  '12345678', // password database
  {
    dialect: 'mariadb' // mariadb / sqlite / postgres
  }
);

database.sync()

module.exports = database;