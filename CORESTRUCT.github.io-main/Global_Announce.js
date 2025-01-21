document.addEventListener('DOMContentLoaded', function () {
    loadAnnouncements();
});

// Load announcements from localStorage and display them
function loadAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('globalAnnouncements')) || [];

    const currentTab = document.getElementById('current');
    const recentTab = document.getElementById('recent');

    // Check if there are any announcements
    if (announcements.length > 0) {
        currentTab.innerHTML = '<h2>Active Announcements</h2>'; // Reset the content
        announcements.forEach((announcement, index) => {
            const announcementDiv = document.createElement('div');
            announcementDiv.classList.add('announcement');
            announcementDiv.innerHTML = `
                <h3>${announcement.subject}</h3>
                <p>${announcement.description}</p>
                <small>Posted on: ${announcement.date}</small>
                <button class="delete-btn" onclick="deleteAnnouncement(${index})">Delete</button>
            `;
            currentTab.appendChild(announcementDiv);
        });
    } else {
        currentTab.innerHTML = '<h2>Active Announcements</h2><p>No active announcements to display.</p>';
    }

    // Display recent announcements (if any)
    if (announcements.length > 0) {
        recentTab.innerHTML = '<h2>Recent Announcements</h2>';
        announcements.slice(-3).forEach((announcement, index) => {  // Display the 3 most recent
            const announcementDiv = document.createElement('div');
            announcementDiv.classList.add('announcement');
            announcementDiv.innerHTML = `
                <h3>${announcement.subject}</h3>
                <p>${announcement.description}</p>
                <small>Posted on: ${announcement.date}</small>
                <button class="delete-btn" onclick="deleteAnnouncement(${index})">Delete</button>
            `;
            recentTab.appendChild(announcementDiv);
        });
    } else {
        recentTab.innerHTML = '<h2>Recent Announcements</h2><p>No recent announcements to display.</p>';
    }
}

// Function to delete an announcement
function deleteAnnouncement(index) {
    let announcements = JSON.parse(localStorage.getItem('globalAnnouncements')) || [];
    announcements.splice(index, 1); // Remove the announcement from the array
    localStorage.setItem('globalAnnouncements', JSON.stringify(announcements)); // Save updated array back to localStorage
    loadAnnouncements(); // Reload announcements after deletion
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    document.querySelector(`#${tabId}`).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Simulate loading more announcements
function loadMoreAnnouncements() {
    const recentTab = document.getElementById('recent');
    const newContent = document.createElement('p');
    newContent.textContent = "Here are some recent announcements...";
    recentTab.appendChild(newContent);
}
