const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const achievementRoutes = require('./routes/achievementRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/achievements', achievementRoutes);

// Health check
app.get('/', (req, res) => res.send('Achievement Tracker server running!'));

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Sync failed:', err));
