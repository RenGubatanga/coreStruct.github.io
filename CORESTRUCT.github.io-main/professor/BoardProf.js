function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach((content) => content.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// Handle form submissions
document.getElementById('announcementForm').addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormSubmission(new FormData(this), 'announcements');
});

document.getElementById('moduleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormSubmission(new FormData(this), 'module');
});

document.getElementById('activitiesForm').addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormSubmission(new FormData(this), 'activities');
});

function handleFormSubmission(formData, sectionId) {
    const section = document.querySelector(`#${sectionId} .item-list`);
    const name = formData.get('subject') || formData.get('moduleName') || formData.get('activityName');
    const description = formData.get('description');
    const file = formData.get('file');

    // Get current publish time
    const publishTime = new Date().toLocaleString();

    // Create a new list item
    const listItem = document.createElement('li');
    let fileLink = '';
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fileLink = `<a href="${e.target.result}" target="_blank">${file.name}</a>`;
            listItem.innerHTML = `
              <h3>${name}</h3>
              <p>${description}</p>
              <p>${fileLink}</p>
              <p><strong>Published on:</strong> ${publishTime}</p>
              <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
            `;
            section.appendChild(listItem);

            saveToLocalStorage(sectionId, name, description, fileLink, publishTime);
        };
        reader.readAsDataURL(file);
    } else {
        listItem.innerHTML = `
          <h3>${name}</h3>
          <p>${description}</p>
          <p><strong>Published on:</strong> ${publishTime}</p>
          <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
        `;
        section.appendChild(listItem);

        saveToLocalStorage(sectionId, name, description, null, publishTime);
    }

    // Close the popup and reset the form
    const popupId = sectionId === 'announcements' ? 'announcementPopup' : `${sectionId}Popup`;
    closePopup(popupId);
    document.getElementById(`${sectionId}Form`).reset();

    alert(`${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} added successfully!`);
}

function saveToLocalStorage(sectionId, name, description, fileLink, publishTime) {
    let data = JSON.parse(localStorage.getItem(sectionId)) || [];
    data.push({ name, description, fileLink, publishTime });
    localStorage.setItem(sectionId, JSON.stringify(data));
}

function deleteItem(button) {
    if (confirm('Are you sure you want to delete this item?')) {
        const listItem = button.parentElement;
        listItem.remove();
        alert('Item deleted successfully!');
    }
}
