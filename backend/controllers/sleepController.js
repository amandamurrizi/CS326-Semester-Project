const sleepModel = require('../models/sleepModel');

exports.logSleep = (req,res) => {
    const {bedtime,wakeTime,mood,totalSleep} = req.body;
    if(!bedtime || !wakeTime || !totalSleep) {
        return res.status(400).json({error: 'Missing fields'});
    }
    sleepModel.saveLog({bedtime,wakeTime,mood,totalSleep});
    res.status(201).json({message: 'Sleep log saved'});
};

exports.getLatestLog = (req, res) => {
    const log = sleepModel.getLatestLog();
    res.json(log || {});
};