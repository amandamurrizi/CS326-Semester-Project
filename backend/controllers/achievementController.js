const { Achievement } = require('../models');

// Get all achievements
async function getAllAchievements(req, res) {
  try {
    const achievements = await Achievement.findAll();
    res.json(achievements);
  } catch (err) {
    console.error('Error fetching achievements:', err);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
}

// Create a new achievement
async function createAchievement(req, res) {
  try {
    const { title, description, date } = req.body;
    const newAchievement = await Achievement.create({ title, description, date });
    res.status(201).json(newAchievement);
  } catch (err) {
    console.error('Error creating achievement:', err);
    res.status(400).json({ error: 'Invalid achievement data' });
  }
}

// Update an achievement
async function updateAchievement(req, res) {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });

    await achievement.update({ title, description, date });
    res.json(achievement);
  } catch (err) {
    console.error('Error updating achievement:', err);
    res.status(400).json({ error: 'Failed to update achievement' });
  }
}

// Delete an achievement
async function deleteAchievement(req, res) {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });

    await achievement.destroy();
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    console.error('Error deleting achievement:', err);
    res.status(500).json({ error: 'Failed to delete achievement' });
  }
}

module.exports = {
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
