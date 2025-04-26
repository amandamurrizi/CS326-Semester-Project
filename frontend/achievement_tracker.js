async function fetchAchievements() {
  const response = await fetch('http://localhost:3002/api/achievements');
  const achievements = await response.json();
  displayAchievements(achievements);
}

function displayAchievements(achievements) {
  const list = document.getElementById('achievement-list');
  list.innerHTML = '';

  achievements.forEach(achievement => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${achievement.name}</strong> - ${achievement.description}<br>
      XP: ${achievement.xp} | Streak: ${achievement.streak} | Completed: ${achievement.completed ? '✅' : '❌'}
      <button onclick="markCompleted('${achievement.id}')">Mark Completed</button>
      <button onclick="deleteAchievement('${achievement.id}')">Delete</button>
    `;
    list.appendChild(listItem);
  });
}

async function addAchievement(event) {
  event.preventDefault();

  const name = document.getElementById('goal-name').value;
  const description = document.getElementById('goal-description').value;
  
  const newAchievement = {
    id: Date.now().toString(),
    name,
    description,
    xp: 0,
    streak: 0,
    completed: false
  };

  await fetch('http://localhost:3002/api/achievements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAchievement)
  });

  document.getElementById('goal-form').reset();
  fetchAchievements();
}

async function markCompleted(id) {
  await fetch(`http://localhost:3002/api/achievements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  });

  fetchAchievements();
}

async function deleteAchievement(id) {
  await fetch(`http://localhost:3002/api/achievements/${id}`, {
    method: 'DELETE'
  });

  fetchAchievements();
}

window.onload = fetchAchievements;
