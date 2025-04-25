//sets up Express app, middleware and routes
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  }));
app.options('*', cors()); 
app.use(express.json());

const sleepRoutes = require('./routes/sleepRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const streakRoutes = require('./routes/streakRoutes');

app.use('/api/sleep', sleepRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/streak', streakRoutes);

module.exports = app;