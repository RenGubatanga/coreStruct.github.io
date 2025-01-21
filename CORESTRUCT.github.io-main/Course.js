document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Handle tab button click
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const target = document.getElementById(button.dataset.tab);
      target.classList.add('active');
    });
  });

  // Load data from localStorage and display it
  loadSectionData('announcements');
  loadSectionData('module');
  loadSectionData('activities');
  
  // Function to load data from localStorage and populate the sections
  function loadSectionData(sectionId) {
    const section = document.getElementById(sectionId);
    const data = JSON.parse(localStorage.getItem(sectionId)) || [];
    
    // Clear any existing content
    section.innerHTML = '';

    // Append data to the section
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Published on:</strong> ${item.publishTime}</p>
        <p>${item.description}</p>
        ${item.fileLink ? `<p>File: ${item.fileLink}</p>` : ''}
        <button class="options-btn" onclick="toggleOptionsMenu(event)">⋮</button>
        <div class="options-menu">
          <button onclick="editCard(event)">Edit</button>
          <button onclick="deleteCard(event)">Delete</button>
        </div>
      `;
      section.appendChild(card);
    });
  }

  // Handle options menu toggle
  window.toggleOptionsMenu = function (event) {
    const menu = event.target.closest('.card').querySelector('.options-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  };
  
  // Handle card edit
  window.editCard = function (event) {
    const card = event.target.closest('.card');
    // You can implement an actual editing function here (e.g., show an edit form)
    alert('Edit functionality to be implemented');
  };
  
  // Handle card deletion
  window.deleteCard = function (event) {
    const card = event.target.closest('.card');
    card.remove();
    alert('Card deleted!');
  };

  // Handle menu toggle
  window.toggleMenu = function() {
  
  };
});
