const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');

router.get('/',streakController.getStreak);
router.put('/',streakController.updateStreak);

module.exports = router; 