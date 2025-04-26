exports.getTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
  };
  
  exports.addTask = (req, res) => {
    const tasks = readTasks();
    const newTask = {
      id: Date.now(),
      text: req.body.text || '',
      completed: req.body.completed || false
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  };
  
  exports.updateTask = (req, res) => {
    const tasks = readTasks();
    const id = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      writeTasks(tasks);
      res.json(tasks[index]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  };
  
  exports.deleteTask = (req, res) => {
    let tasks = readTasks();
    const id = parseInt(req.params.id);
    const filtered = tasks.filter(t => t.id !== id);
    writeTasks(filtered);
    res.status(204).send();
  };