const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());
const tasksFilePath = path.join(__dirname, 'planner_tasks.json');

function loadTasks() {
    const raw = fs.readFileSync(tasksFilePath);
    return JSON.parse(raw);
  }
  
  // this will GET tasks from specific date 
  app.get('/tasks', (req, res) => {
    const { week } = req.query;
    if (!week) {
      return res.status(400).json({ error: 'Missing: (YYYY-MM-DD)' });
    }
  
    const startDate = new Date(week);
    if (isNaN(startDate)) {
      return res.status(400).json({ error: 'Invalid format, use YYYY-MM-DD' });
    }
  
    const giventasks = loadTasks();
  
    const week_t = giventasks.filter(task => {
      const taskDate = new Date(task.date);
      const diff = (taskDate - startDate) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 7;
    });
  
    res.json(week_t);
  });
  
  // this will GET the summary of month
  app.get('/summary/:month', (req, res) => {
    console.log("Summary route hit with:", req.params.month);
    const { month } = req.params;
    const giventasks = loadTasks();
  
    // choose for that specific month/ organize
    const month_t = giventasks.filter(task => task.date.startsWith(month));

    const weeks = {};
    month_t.forEach(task => {
      const date = new Date(task.date);
      const weekNum = Math.ceil(date.getDate() / 7);
      if (!weeks[weekNum]) weeks[weekNum] = [];
      weeks[weekNum].push(task);
    });
    // weeks
    const summary = {
        tasksofWeek: {},
        busiest: null,
        none: []
      };
    
      let maxTasks = 0;
      for (let i = 1; i <= 5; i++) {
        const count = (weeks[i] || []).length;
        summary.tasksofWeek[`Week ${i}`] = count;
        if (count > maxTasks) {
          maxTasks = count;
          summary.busiest = `Week ${i}`;
        }
      }
  
    // no tasks
    const days = new Date(month.split('-')[0], month.split('-')[1], 0).getDate();
    const date_task = new Set(month_t.map(task => parseInt(task.date.split('-')[2])));
    for (let d = 1; d <= days; d++) {
      if (!date_task.has(d)) {
        summary.none.push(`${month}-${String(d).padStart(2, '0')}`);
      }
    }
  
    res.json(summary);
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });