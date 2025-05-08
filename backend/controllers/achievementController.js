const Achievement = require('../models/achievement');

// TA assisted: Calculate XP based on frequency
function calculateXP(frequency) {
  switch (frequency) {
    case 'daily': return 10;
    case 'weekly': return 25;
    case 'monthly': return 50;
    default: return 5;
  }
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// GET all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.json(achievements);
  } catch (err) {
    console.error('Error fetching achievements:', err);
    res.status(500).send('Error fetching achievements');
  }
};

// POST a new achievement (with XP & streak logic)
exports.createAchievement = async (req, res) => {
  try {
    const { title, description, category, frequency } = req.body;

    if (!title || !category || !frequency) {
      return res.status(400).send('Missing required fields');
    }

    const xp = calculateXP(frequency);
    let streak = 1;

    // Check if the same goal was completed yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toISOString().split('T')[0];

    const previous = await Achievement.findOne({
      where: {
        title,
        date: yDate
      }
    });

    if (previous) {
      streak = previous.streak + 1;
    }

    const newAchievement = await Achievement.create({
      title,
      description,
      category,
      frequency,
      xp,
      streak,
      date: getTodayDate()
    });

    res.status(201).json(newAchievement);
  } catch (err) {
    console.error('Error creating achievement:', err);
    res.status(500).send('Error creating achievement');
  }
};

// PUT update an achievement (with XP & streak logic)
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, frequency } = req.body;
    const achievement = await Achievement.findByPk(id);

    if (!achievement) {
      return res.status(404).send('Achievement not found');
    }

    if (title) achievement.title = title;
    if (description) achievement.description = description;
    if (category) achievement.category = category;

    if (frequency) {
      achievement.frequency = frequency;
      achievement.xp = calculateXP(frequency);
    }

    // Update streak if yesterday's achievement exists
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toISOString().split('T')[0];

    const previous = await Achievement.findOne({
      where: {
        title: achievement.title,
        category: achievement.category,
        date: yDate
      }
    });

    if (previous) {
      achievement.streak = previous.streak + 1;
    }

    achievement.date = getTodayDate();

    await achievement.save();
    res.json(achievement);
  } catch (err) {
    console.error('Error updating achievement:', err);
    res.status(500).send('Error updating achievement');
  }
};

// DELETE an achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findByPk(id);

    if (!achievement) {
      return res.status(404).send('Achievement not found');
    }

    await achievement.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting achievement:', err);
    res.status(500).send('Error deleting achievement');
  }
};
