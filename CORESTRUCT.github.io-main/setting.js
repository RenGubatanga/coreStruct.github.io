document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form fields and the save button
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email-address');
    const contactInput = document.getElementById('contact');
    const biographyInput = document.getElementById('biography');
    const linksInput = document.getElementById('links');
    const activityLoggingCheckbox = document.getElementById('activity-logging');
    const saveChangesBtn = document.getElementById('save-changes-btn');
    
    // Fill the inputs with current user data if available
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
        fullNameInput.value = loggedInUser.name || '';
        emailInput.value = loggedInUser.email || '';
        contactInput.value = loggedInUser.contact || '';
        biographyInput.value = loggedInUser.biography || '';
        linksInput.value = loggedInUser.links || '';
        activityLoggingCheckbox.checked = loggedInUser.activityLogging || false;
    }

    // Handle saving the changes
    saveChangesBtn.addEventListener('click', () => {
        const updatedUser = {
            name: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            contact: contactInput.value.trim(),
            biography: biographyInput.value.trim(),
            links: linksInput.value.trim(),
            activityLogging: activityLoggingCheckbox.checked
        };

        // Validate that name and email are provided
        if (updatedUser.name === "" || updatedUser.email === "") {
            alert("Name and Email are required fields.");
            return;
        }

        // Save updated user data to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        alert("Changes saved successfully!");

        // Optionally redirect to profile page after saving
        window.location.href = 'profile.html';
    });
});
