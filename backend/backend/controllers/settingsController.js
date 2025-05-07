const settingsModel = require('../models/settingsModel');

exports.getSleepGoal = (req, res) => {
    const goal = settingsModel.getSleepGoal();
    if (goal !== null) {
        res.json({ sleepGoal: goal });
    } else {
        res.status(404).json({ message: 'No sleep goal found' });
    }
};

exports.updateSleepGoal = (req, res) => {
    const { sleepGoal } = req.body;
    if (!sleepGoal || isNaN(sleepGoal)) {
        return res.status(400).json({ error: 'Invalid sleep goal' });
    }

    settingsModel.updateSleepGoal(parseFloat(sleepGoal));
    res.status(200).json({ message: 'Sleep goal updated successfully' });
};
