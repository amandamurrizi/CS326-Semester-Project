const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SleepEntry = sequelize.define('SleepEntry', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sleepStart: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sleepEnd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  feeling: {
    type: DataTypes.STRING,
    allowNull: true
  },
  totalSleep: {
    type: DataTypes.FLOAT
  }
});

module.exports = SleepEntry;
