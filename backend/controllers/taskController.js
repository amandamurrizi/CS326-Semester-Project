const Task = require('../models/taskModel');

//get
const getAllTasks = async (req, res) => {
  try {
    const { week } = req.query;
    let tasks;

    if (week) {
      const startDate = new Date(week);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);

      tasks = await Task.findAll({
        where: {
          date: {
            [require('sequelize').Op.between]: [startDate, endDate]
          }
        }
      });
    } else {
      tasks = await Task.findAll();
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// post ta sks
const createTask = async (req, res) => {
  try {
    const { title, date } = req.body;
    const newTask = await Task.create({ title, date });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

module.exports = {
  getAllTasks,
  createTask
};