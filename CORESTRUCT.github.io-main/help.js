function closeHelp() {
    const helpContainer = document.querySelector('.help-container');
    helpContainer.style.display = 'none'; // Close the help container
}

// Mock search suggestions
function showSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsDiv = document.getElementById('suggestions');

    const mockSuggestions = [
        "How to update profile?",
        "How to upload files?",
        "How to set notifications?",
        "How to report a problem?"
        
    ];

    const searchText = searchInput.value.toLowerCase();
    const filteredSuggestions = mockSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchText)
    );

    // Clear previous suggestions
    suggestionsDiv.innerHTML = '';

    // Show filtered suggestions
    filteredSuggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = suggestion;
        suggestionsDiv.appendChild(suggestionDiv);
    });

    // Display or hide suggestions
    suggestionsDiv.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
}
