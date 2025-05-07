const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../storage/settings.json');

function readSettings() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeSettings(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getSleepGoal() {
    const settings = readSettings();
    return settings.sleepGoal || null;
}

function updateSleepGoal(goal) {
    const settings = readSettings();
    settings.sleepGoal = goal;
    writeSettings(settings);
}

module.exports = { getSleepGoal, updateSleepGoal };
