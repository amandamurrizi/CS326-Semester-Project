const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const { User, SleepEntry, MoodLog } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

const sleepRoutes = require('./routes/sleepRoutes');
app.use('/api/sleep', sleepRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync failed:', err));

app.get('/', (req, res) => {
  res.send('Server running!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

