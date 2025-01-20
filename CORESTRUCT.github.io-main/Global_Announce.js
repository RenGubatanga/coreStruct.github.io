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
