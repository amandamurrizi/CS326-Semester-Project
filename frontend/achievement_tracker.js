// Initialize variables for XP goal and streak
let xpGoal = 0;
let currentStreak = 0;
let longestStreak = 0;

// Fetch and display achievements
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
}

// Add a new achievement
async function addAchievement(event) {
  event.preventDefault();

  const title = document.getElementById('goal-title').value;
  const description = document.getElementById('goal-description').value;

  const newAchievement = {
    title,
    description,
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

// Set XP goal
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

// Update streak
function updateStreak() {
  currentStreak += 1;
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  document.getElementById('current-streak').textContent = currentStreak;
  document.getElementById('longest-streak').textContent = longestStreak;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  fetchAchievements();

  // Load streak and XP goal from local storage
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
});

// Save streak and XP goal to local storage before the page unloads
window.addEventListener('beforeunload', () => {
  localStorage.setItem('xpGoal', xpGoal);
  localStorage.setItem('currentStreak', currentStreak);
  localStorage.setItem('longestStreak', longestStreak);
});
