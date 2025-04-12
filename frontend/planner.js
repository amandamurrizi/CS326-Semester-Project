let db;
const weekday_con = document.getElementById("weekdays-container");
const todoTitle = document.getElementById("todo-title");
const todoList = document.getElementById("todo-list");
const weekRange = document.getElementById("week-range");
const params = new URLSearchParams(window.location.search);
const year = parseInt(params.get("year"));
const selectedMonth = parseInt(params.get("month"));

//set starting week (Sunday)
let currentWeekStart = new Date(localStorage.getItem("planner-week-start") || getSunday(new Date()));

function getSunday(date) {
  const day = date.getDay();
  const start_sunday = new Date(date);
    start_sunday.setDate(date.getDate() - day);
  start_sunday.setHours(0, 0, 0, 0);
  return start_sunday;
}

if (!isNaN(year) && !isNaN(month)) {
    const firstOfMonth = new Date(year, month - 1, 1);
    currentWeekStart = getSunday(firstOfMonth); 
  } else {
    currentWeekStart = new Date(localStorage.getItem("planner-week-start") || getSunday(new Date()));
  }

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function formatTitle(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric"
  });
}


const request = indexedDB.open("plannerDB", 1);
request.onupgradeneeded = (e) => {
  db = e.target.result;
  if (!db.objectStoreNames.contains("todos")) {
    db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
  }
};
request.onsuccess = (e) => {
  db = e.target.result;
  renderWeek();
};

function renderWeek() {
  localStorage.setItem("planner-week-start", currentWeekStart.toISOString());
  weekday_con.innerHTML = "";
  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(currentWeekStart.getDate() + 6);

  const headerMonthYear = currentWeekStart.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  weekRange.textContent = headerMonthYear;
  
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(currentWeekStart);
    dayDate.setDate(dayDate.getDate() + i);

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.dataset.date = formatDate(dayDate);
    dayDiv.innerHTML = `<div class="date">${dayDate.toLocaleDateString('en-US', { weekday: 'short' })}<br/>${dayDate.getDate()}</div>`;
    dayDiv.addEventListener("click", () => {
      updateTodoHeader(dayDate);
      fetchTasks(formatDate(dayDate));
    });
    weekday_con.appendChild(dayDiv);
  }

//start of furst day
  updateTodoHeader(currentWeekStart);
  fetchTasks(formatDate(currentWeekStart));
}

function updateTodoHeader(dateObj) {
  todoTitle.textContent = `To Do List - ${formatTitle(dateObj)}`;
}

function fetchTasks(dateStr) {
  todoList.innerHTML = "";
  const tx = db.transaction("todos", "readonly");
  const store = tx.objectStore("todos");

  store.openCursor().onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      if (cursor.value.date === dateStr) {
        const li = document.createElement("li");
        li.textContent = cursor.value.task;
        todoList.appendChild(li);
      }
      cursor.continue();
    }
  };
}
//buttons
document.getElementById("prev-week").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  renderWeek();
});

document.getElementById("next-week").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  renderWeek();
});