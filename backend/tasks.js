const { DataTypes } = require('sequelize');
const plannerdb = require('./plannerdb');

const Task = plannerdb.define('Task', {
    
  title:{
    type: DataTypes.STRING,
    allowNull: false
  },
  date:{
    type:DataTypes.DATEONLY,
    allowNull:false
  }
});

module.exports = Task;