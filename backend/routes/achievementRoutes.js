const express = require('express');
const router = express.Router();
const {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementController');

router.get('/', getAllAchievements);
router.post('/', addAchievement);
router.put('/:id', updateAchievement);
router.delete('/:id', deleteAchievement);

module.exports = router;