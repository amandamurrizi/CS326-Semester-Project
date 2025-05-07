const express = require('express');
const router = express.Router();
const {
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementController');

// GET all achievements
router.get('/', getAllAchievements);

// POST a new achievement
router.post('/', createAchievement);

// PUT update an achievement
router.put('/:id', updateAchievement);

// DELETE an achievement
router.delete('/:id', deleteAchievement);

module.exports = router;
