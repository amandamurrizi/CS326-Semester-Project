const express = require('express');
const router = express.Router();
const { SleepEntry } = require('../models');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const entries = await SleepEntry.findAll({
      where: { userId },
      order: [['sleepStart', 'DESC']]
    });
    res.json(entries);
  } catch (err) {
    console.error('Error fetching sleep entries:', err);
    res.status(500).json({ error: 'Failed to retrieve sleep entries' });
  }
});

router.post('/', async (req, res) => {
  const { userId, bedtime, wakeTime, mood, totalSleep } = req.body;

  try {
    const newEntry = await SleepEntry.create({
      userId,
      sleepStart: bedtime,
      sleepEnd: wakeTime,
      feeling: mood,
      totalSleep
    });
    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Error creating sleep entry:', err);
    res.status(500).json({ error: 'Failed to create sleep entry' });
  }
});

module.exports = router;
