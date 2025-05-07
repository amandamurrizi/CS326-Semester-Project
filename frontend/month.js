let currentYear = 2025; // Default 
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
 // monthGrid.innerHTML = ""; 

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  

  // let it all connect with each month to year each button
  //each month button

  monthGrid.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const monthBox = document.createElement("div");
    monthBox.className = "month-box";
    monthBox.textContent = monthNames[i];

    monthBox.addEventListener("click", () => {
      // Store selected month and year in localStorage
      localStorage.setItem("selectedMonth", i);
      localStorage.setItem("selectedYear", currentYear);
      window.location.href = "weekly.html";
    });

    monthGrid.appendChild(monthBox);
  }
}
//   monthNames.forEach((month, index) => {
//     index +=1;
//     const link = document.createElement("a");
//     link.className = "month-box";
//     link.href = `weekly.html?year=${currentYear}&month=${index + 1}`;
//     link.textContent = month;
//     monthGrid.appendChild(link);
//   });
// }

prev.addEventListener("click", () => {
  currentYear--;
  updateYearDisplay();
});

next.addEventListener("click", () => {
  currentYear++;
  updateYearDisplay();
});


updateYearDisplay();


