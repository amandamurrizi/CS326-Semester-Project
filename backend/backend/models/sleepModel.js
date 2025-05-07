const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../storage/sleep.json');

function getAllLogs() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
    return JSON.parse(fs.readFileSync(filePath));
}

function saveLog(log) {
    const logs = getAllLogs();
    logs.push({ ...log, date: new Date().toISOString().split('T')[0] });
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

function getLatestLog() {
    const logs = getAllLogs();
    return logs.length > 0 ? logs[logs.length - 1] : null;
}

module.exports = { saveLog, getLatestLog };