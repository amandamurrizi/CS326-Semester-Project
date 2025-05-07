const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../storage/achievementData.json');

function readAchievements() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeAchievements(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readAchievements, writeAchievements };
