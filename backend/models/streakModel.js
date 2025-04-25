const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../storage/streak.json');

function readStreak() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getStreak() {
    const streak = readStreak();
    return streak.count || 0;
}

function updateStreak(newCount) {
    const data = { count: newCount };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { getStreak, updateStreak };
