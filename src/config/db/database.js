const Sequelize = require('sequelize');

const db = new Sequelize('newspaperbyphamnam', 'postgres', 'phamnam123', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;