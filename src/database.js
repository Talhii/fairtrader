var Sequelize = require('sequelize');

const database = new Sequelize(
  'fairtrader', // name database
  'root', // user database
  process.env.DB_PASSWORD, // password database
  {
    dialect: 'mariadb' // mariadb / sqlite / postgres
  }
);

database.sync()

module.exports = database;