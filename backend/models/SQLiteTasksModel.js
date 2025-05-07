const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/tasks.sqlite',
});

const Task = sequelize.define('Task', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

(async () => {
  await sequelize.sync({ force: false }); // Sync the database
})();

module.exports = Task;