const calendar = document.getElementById('calendar');
const todayBtn = document.getElementById('todayBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();



// Function to render the calendar
function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay();

  const today = new Date(); // Get today's date
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  let calendarHTML = `
    <h2>${date.toLocaleString('default', { month: 'long' })} ${year}</h2>
    <table>
      <thead>
        <tr>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
        </tr>
      </thead>
      <tbody>
  `;

  let day = 1;
  for (let i = 0; i < 6; i++) {
    calendarHTML += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        calendarHTML += '<td></td>';
      } else if (day > lastDay.getDate()) {
        calendarHTML += '<td></td>';
      } else {
        const isToday = (day === todayDate && month === todayMonth && year === todayYear); // Check if the current day is today
        const todayClass = isToday ? 'today' : ''; // Apply 'today' class if it's today's date
        calendarHTML += `<td class="${todayClass}">${day}</td>`;
        day++;
      }
    }
    calendarHTML += '</tr>';
  }

  calendarHTML += '</tbody></table>';
  calendar.innerHTML = calendarHTML;
}

// Event listeners for navigation
todayBtn.addEventListener('click', () => {
  currentDate = new Date();
  renderCalendar(currentDate);
});

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Function to change the view
function changeView(view) {
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.view-btn[onclick="changeView('${view}')"]`).classList.add('active');
}

// Initial render
renderCalendar(currentDate);