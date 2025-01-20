// Load user data from localStorage
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// DOM elements
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email-address');
const contactInput = document.getElementById('contact');
const biographyInput = document.getElementById('biography');
const linksInput = document.getElementById('links');
const activityLoggingCheckbox = document.getElementById('activity-logging');
const saveChangesBtn = document.getElementById('save-changes-btn');
const deleteAccountBtn = document.getElementById('delete-account-btn');
const deleteWarning = document.getElementById('delete-warning');

// Check if user is logged in, otherwise redirect to login page
if (!loggedInUser) {
    window.location.href = "index.html";
}

// Populate fields with user data
fullNameInput.value = loggedInUser.name || '';
emailInput.value = loggedInUser.email || '';
contactInput.value = loggedInUser.contact || '';  // Make sure the contact is populated
biographyInput.value = loggedInUser.biography || '';
linksInput.value = loggedInUser.links || '';
activityLoggingCheckbox.checked = loggedInUser.activityLogging || false;

// Save Changes button logic
saveChangesBtn.addEventListener('click', () => {
    const updatedUser = {
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        contact: contactInput.value.trim(),  // Save the updated contact
        biography: biographyInput.value.trim(),
        links: linksInput.value.trim(),
        activityLogging: activityLoggingCheckbox.checked
    };

    if (updatedUser.name === "" || updatedUser.email === "") {
        alert("Name and Email are required fields.");
        return;
    }

    // Save updated user data back to localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    alert("Changes saved successfully!");
});

// Account Deletion button logic
deleteAccountBtn.addEventListener('click', () => {
    deleteWarning.style.display = "block"; // Show warning

    // Confirm account deletion
    if (confirm("Are you sure you want to permanently delete your account?")) {
        // Remove user data from localStorage
        localStorage.removeItem('loggedInUser');
        alert("Your account has been deleted.");
        window.location.href = "index.html"; // Redirect to login page after deletion
    }
});
