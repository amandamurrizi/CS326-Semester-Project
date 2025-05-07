const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MoodLog = sequelize.define('MoodLog', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: false // e.g., "happy", "tired", "anxious"
  },
  note: {
    type: DataTypes.TEXT
  },
  loggedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = MoodLog;
