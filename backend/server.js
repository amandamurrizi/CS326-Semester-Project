const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const achievementRoutes = require('./routes/achievementRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.use('/api/achievements', achievementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
