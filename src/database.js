var Sequelize = require('sequelize');

const database = new Sequelize(
  'fairtrader', // name database
  'root', // user database
  process.env.DB_PASSWORD, // password database
  {
    host: 'ubuntu@ip-172-31-37-152',
    dialect: 'mariadb' // mariadb / sqlite / postgres
  }
);

database.sync()

module.exports = database;