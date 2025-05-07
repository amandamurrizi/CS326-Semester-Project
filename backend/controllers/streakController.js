const streakModel = require('../models/streakModel');

exports.getStreak = (req, res) => {
    const count = streakModel.getStreak();
    res.json({ streak: count });
};

exports.updateStreak = (req, res) => {
    const { streak } = req.body;
    if (typeof streak !== 'number' || streak < 0) {
        return res.status(400).json({ error: 'Invalid streak count' });
    }

    streakModel.updateStreak(streak);
    res.status(200).json({ message: 'Streak updated successfully' });
};

