
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Creates a persistent file-based SQLite DB
});

module.exports = sequelize;
