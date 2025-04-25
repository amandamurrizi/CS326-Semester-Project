const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleepController');

router.post('/',sleepController.logSleep);
router.get('/latest',sleepController.getLatestLog);

module.exports = router;