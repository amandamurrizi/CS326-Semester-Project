let xpGoal = 0;
let currentStreak = 0;
let longestStreak = 0;

async function fetchAchievements() {
  const response = await fetch('http://localhost:3000/api/achievements');
  const achievements = await response.json();
  const achievementList = document.getElementById('achievement-list');
  achievementList.innerHTML = '';

  achievements.forEach(achievement => {
    const listItem = document.createElement('li');
    listItem.textContent = `${achievement.title} - ${achievement.description} (${achievement.date})`;
    achievementList.appendChild(listItem);
  });

  updateReminders(achievements);
}

async function addAchievement(event) {
  event.preventDefault();
  console.log("✅ Add Achievement triggered");

  const title = document.getElementById('goal-title').value;
  const description = document.getElementById('goal-description').value;
  const category = document.getElementById('goal-category').value;
  const frequency = document.getElementById('goal-frequency').value;

  const newAchievement = {
    title,
    description,
    category,
    frequency,
    date: new Date().toISOString().split('T')[0]
  };

  const response = await fetch('http://localhost:3000/api/achievements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAchievement)
  });

  if (response.ok) {
    updateStreak();
    document.getElementById('goal-form').reset();
    fetchAchievements();
  } else {
    console.error('Failed to add achievement');
  }
}

function setXpGoal(event) {
  event.preventDefault();
  const xpGoalInput = document.getElementById('xp-goal').value;
  xpGoal = parseInt(xpGoalInput, 10);

  if (!isNaN(xpGoal) && xpGoal > 0) {
    document.getElementById('current-xp-goal').textContent = `${xpGoal} XP`;
    alert(`XP Goal set to ${xpGoal} XP!`);
  } else {
    alert('Please enter a valid XP goal.');
  }

  document.getElementById('xp-goal-form').reset();
}

function updateStreak() {
  currentStreak += 1;
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  document.getElementById('current-streak').textContent = currentStreak;
  document.getElementById('longest-streak').textContent = longestStreak;
}

function updateReminders(achievements) {
  const reminderSection = document.getElementById('reminder-section');
  reminderSection.innerHTML = '<h2>Reminders</h2>';

  const categories = new Set();
  achievements.forEach(a => categories.add(a.category.toLowerCase()));

  categories.forEach(category => {
    const reminder = document.createElement('div');
    reminder.classList.add('reminder-item');
    reminder.innerHTML = `
      <p>Reminder: Don't forget your ${category} goal today!</p>
      <span class="reminder-status">Pending</span>
    `;
    reminderSection.appendChild(reminder);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAchievements();

  const savedXpGoal = localStorage.getItem('xpGoal');
  const savedCurrentStreak = localStorage.getItem('currentStreak');
  const savedLongestStreak = localStorage.getItem('longestStreak');

  if (savedXpGoal) {
    xpGoal = parseInt(savedXpGoal, 10);
    document.getElementById('current-xp-goal').textContent = `${xpGoal} XP`;
  }

  if (savedCurrentStreak) {
    currentStreak = parseInt(savedCurrentStreak, 10);
    document.getElementById('current-streak').textContent = currentStreak;
  }

  if (savedLongestStreak) {
    longestStreak = parseInt(savedLongestStreak, 10);
    document.getElementById('longest-streak').textContent = longestStreak;
  }

  document.getElementById('goal-form').addEventListener('submit', addAchievement);
  document.getElementById('xp-goal-form').addEventListener('submit', setXpGoal);
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('xpGoal', xpGoal);
  localStorage.setItem('currentStreak', currentStreak);
  localStorage.setItem('longestStreak', longestStreak);
});
