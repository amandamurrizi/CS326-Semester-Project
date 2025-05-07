const Task = require('../models/SQLiteTasksModel'); // Use the Sequelize model

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const newTask = await Task.create({
    text: req.body.text || '',
    completed: req.body.completed || false,
  });
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const updatedTask = await Task.update(req.body, { where: { id } });
  if (updatedTask[0]) {
    const task = await Task.findByPk(id);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  const deleted = await Task.destroy({ where: { id } });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};