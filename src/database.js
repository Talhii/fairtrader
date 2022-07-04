var Sequelize = require('sequelize');

const database = new Sequelize(
  'userprofile', // name database
  'root', // user database
  '12345678', // password database
  {
    host: 'localhost',
    dialect: 'mariadb' // mariadb / sqlite / postgres
  }
);

database.sync()

module.exports = database;