const express = require('express');
const cors = require('cors');
const achievementRoutes = require('./routes/achievementRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/achievements', achievementRoutes);

module.exports = app;