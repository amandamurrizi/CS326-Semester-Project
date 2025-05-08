// Initialize variables for XP goal and streak
let xpGoal = 0;
let currentStreak = 0;
let longestStreak = 0;

// Fetch and display achievements
async function fetchAchievements() {
  try {
    const response = await fetch('http://localhost:3000/api/achievements');
    const achievements = await response.json();
    const achievementList = document.getElementById('achievement-list');
    achievementList.innerHTML = '';

    let totalXP = 0;

    achievements.forEach(({ title, description, category, frequency, xp, date }) => {
      totalXP += xp || 0;

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div>
          <span class="goal-title">${title}</span> - ${description} (${date})<br>
          <small>Category: ${category}, Frequency: ${frequency}</small>
        </div>
        <div>
          <span class="goal-status">+${xp} XP</span>
        </div>
      `;
      achievementList.appendChild(listItem);
    });

    document.getElementById('xp').textContent = totalXP;
    document.getElementById('streak').textContent = currentStreak;

    generateReminders(achievements);
  } catch (err) {
    console.error('Error fetching achievements:', err);
  }
}

// Add a new achievement
async function addAchievement(event) {
  event.preventDefault();

  const title = document.getElementById('goal-title').value;
  const description = document.getElementById('goal-description').value;
  const category = document.getElementById('goal-category').value;
  const frequency = document.getElementById('goal-frequency').value;

  if (!title || !description || !category || !frequency) {
    alert("Please fill in all fields.");
    return;
  }

  const newAchievement = {
    title,
    description,
    category,
    frequency,
    date: new Date().toISOString().split('T')[0]
  };

  try {
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
      alert('Error adding achievement. Please try again.');
    }
  } catch (err) {
    console.error('Network error:', err);
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

// Generate reminders based on achievements
function generateReminders(achievements) {
  const reminderContainer = document.getElementById('reminder-section');
  reminderContainer.innerHTML = '<h2>Reminders</h2>'; // reset header

  const categories = achievements.map(a => a.category);
  const uniqueCategories = [...new Set(categories)];

  if (uniqueCategories.includes('fitness')) {
    reminderContainer.innerHTML += `
      <div class="reminder-item">
        <p>Reminder: Stay consistent with your fitness goals today!</p>
        <span class="reminder-status">Pending</span>
      </div>
    `;
  }

  if (!uniqueCategories.includes('study')) {
    reminderContainer.innerHTML += `
      <div class="reminder-item">
        <p>Reminder: You haven't set any study goals yet. Consider adding one!</p>
        <span class="reminder-status">Suggested</span>
      </div>
    `;
  }

  if (uniqueCategories.includes('habit')) {
    reminderContainer.innerHTML += `
      <div class="reminder-item">
        <p>Keep up with your habit-building streak!</p>
        <span class="reminder-status">In Progress</span>
      </div>
    `;
  }

  if (achievements.length === 0) {
    reminderContainer.innerHTML += `
      <div class="reminder-item">
        <p>Start by adding your first achievement!</p>
        <span class="reminder-status">Getting Started</span>
      </div>
    `;
  }
}

// Initialize the page
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
});

// Save streak and XP goal to local storage before the page unloads
window.addEventListener('beforeunload', () => {
  localStorage.setItem('xpGoal', xpGoal);
  localStorage.setItem('currentStreak', currentStreak);
  localStorage.setItem('longestStreak', longestStreak);
});
