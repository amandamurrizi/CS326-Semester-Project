const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../storage/achievementData.json');

function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getAllAchievements(req, res) {
  const achievements = readData();
  res.json(achievements);
}

function addAchievement(req, res) {
  const achievements = readData();
  const newAchievement = req.body;
  achievements.push(newAchievement);
  writeData(achievements);
  res.status(201).json(newAchievement);
}

function updateAchievement(req, res) {
  const achievements = readData();
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
  writeData(achievements);

  res.json(achievements[achievementIndex]);
}

function deleteAchievement(req, res) {
  const achievements = readData();
  const id = req.params.id;

  const filteredAchievements = achievements.filter(a => a.id !== id);
  writeData(filteredAchievements);
  res.status(204).end();
}

module.exports = {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement
};