const { Sequelize } = require('sequelize');

const plannerdb = new Sequelize({
  dialect: 'sqlite',
  storage: './planner.sqlite'
});

module.exports = plannerdb;