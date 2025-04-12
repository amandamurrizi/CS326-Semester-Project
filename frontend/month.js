let currentYear = parseInt(localStorage.getItem("plannerYear")) || 2025;

const yearDisplay = document.getElementById("year-display");
const monthGrid = document.getElementById("month-grid");
const prev = document.getElementById("prev-year");
const next = document.getElementById("next-year");

function updateYearDisplay() {
  yearDisplay.textContent = currentYear;
  localStorage.setItem("plannerYear", currentYear);
  renderMonths();
}

function renderMonths() {
  monthGrid.innerHTML = ""; 

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // let it all connect with each month to year each button
  //each month button
  monthNames.forEach((month, index) => {
    index +=1;
    const link = document.createElement("a");
    link.className = "month-box";
    link.href = `weekly.html?year=${currentYear}&month=${index + 1}`;
    link.textContent = month;
    monthGrid.appendChild(link);
  });
}

prev.addEventListener("click", () => {
  currentYear--;
  updateYearDisplay();
});

next.addEventListener("click", () => {
  currentYear++;
  updateYearDisplay();
});


updateYearDisplay();

