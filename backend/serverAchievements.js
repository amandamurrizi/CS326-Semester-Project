const express = require('express');
const cors = require('cors');
const achievementRoutes = require('./routes/achievementRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/achievements', achievementRoutes);

app.listen(PORT, () => {
  console.log(`Achievement Tracker Server is running at http://localhost:${PORT}`);
});
