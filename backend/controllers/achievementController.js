const { readAchievements, writeAchievements } = require('../models/achievementModel');

// GET all achievements
function getAllAchievements(req, res) {
  const achievements = readAchievements();
  res.json(achievements);
}

// POST a new achievement
function addAchievement(req, res) {
  const achievements = readAchievements();
  const newAchievement = req.body;
  achievements.push(newAchievement);
  writeAchievements(achievements);
  res.status(201).json(newAchievement);
}

// PUT to update an achievement (by ID)
function updateAchievement(req, res) {
  const achievements = readAchievements();
  const id = req.params.id;
  const updatedData = req.body;

  const achievementIndex = achievements.findIndex(a => a.id === id);
  if (achievementIndex === -1) {
    return res.status(404).json({ error: "Achievement not found" });
  }

  const achievement = achievements[achievementIndex];

  if (updatedData.completed === true) {
    achievement.xp += 100;
    achievement.streak += 1;
  }

  if (achievement.xp >= 300) {
    achievement.completed = true;
  }

  achievements[achievementIndex] = { ...achievement, ...updatedData };
  writeAchievements(achievements);

  res.json(achievements[achievementIndex]);
}

// DELETE an achievement (by ID)
function deleteAchievement(req, res) {
  const achievements = readAchievements();
  const id = req.params.id;

  const filteredAchievements = achievements.filter(a => a.id !== id);
  writeAchievements(filteredAchievements);
  res.status(204).end();
}

module.exports = {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement
};
