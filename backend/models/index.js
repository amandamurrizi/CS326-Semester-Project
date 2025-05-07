const User = require('./user');
const SleepEntry = require('./sleepEntry');
const MoodLog = require('./moodLog');
const Achievement = require('./achievement');

User.hasMany(SleepEntry, { foreignKey: 'userId' });
User.hasMany(MoodLog, { foreignKey: 'userId' });

SleepEntry.belongsTo(User, { foreignKey: 'userId' });
MoodLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  SleepEntry,
  MoodLog,
  Achievement 
};
