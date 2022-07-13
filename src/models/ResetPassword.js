var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');



var ResetToken = sequelize.define('resetPassword', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    email: {
        type: Sequelize.STRING,
    },
    token: {
        type: Sequelize.STRING,
    },
    used: {
        type: Sequelize.INTEGER,
        defaultValue:0,
    },

});

module.exports = ResetToken
