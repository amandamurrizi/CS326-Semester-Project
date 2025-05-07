const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.get('/sleep-goal',settingsController.getSleepGoal);
router.put('/sleep-goal',settingsController.updateSleepGoal);

module.exports = router;