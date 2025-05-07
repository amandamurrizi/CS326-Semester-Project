const { DataTypes } = require('sequelize');
const plannerdb = require('../plannerdb');

const Task = plannerdb.define('Task', {
  title: DataTypes.STRING,
  date: DataTypes.DATEONLY
});

module.exports = Task;