// Show the popup
function openPopup() {
    document.getElementById('announcementPopup').style.display = 'flex';
}

// Close the popup
function closePopup() {
    document.getElementById('announcementPopup').style.display = 'none';
}

// Handle the form submission
document.getElementById('announcementForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the values from the form
    const subject = e.target.subject.value;
    const description = e.target.description.value;

    // Create a new announcement element
    const announcementList = document.querySelector('.announcement-list');
    const newAnnouncement = document.createElement('div');
    newAnnouncement.classList.add('announcement');
    newAnnouncement.innerHTML = `
        <h2>${subject}</h2>
        <p>${description}</p>
        <small>Posted on: ${new Date().toLocaleDateString()}</small>
    `;

    // Add the new announcement to the list
    announcementList.prepend(newAnnouncement);

    // Save the new announcement to localStorage
    const existingAnnouncements = JSON.parse(localStorage.getItem('globalAnnouncements')) || [];
    existingAnnouncements.push({
        subject: subject,
        description: description,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('globalAnnouncements', JSON.stringify(existingAnnouncements));

    // Clear the form and close the popup
    e.target.reset();
    closePopup();
});
