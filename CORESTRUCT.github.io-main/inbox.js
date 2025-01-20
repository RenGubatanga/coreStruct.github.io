    // Function to search messages
    function searchMessages() {
        let searchInput = document.getElementById('searchInput').value.toLowerCase();
        let messages = document.querySelectorAll('.message-item');
        
        messages.forEach(function(message) {
            let sender = message.querySelector('.sender').textContent.toLowerCase();
            let snippet = message.querySelector('.snippet').textContent.toLowerCase();
            
            // Show or hide message based on search query
            if (sender.includes(searchInput) || snippet.includes(searchInput)) {
                message.style.display = 'flex';
            } else {
                message.style.display = 'none';
            }
        });
    }

    // Function to toggle message menu (Mark as Read/Delete options)
    function toggleMenu(event) {
        let menu = event.target.closest('.message-item').querySelector('.message-menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

    // Function to mark message as read
    function markAsRead(event) {
        let messageItem = event.target.closest('.message-item');
        messageItem.style.backgroundColor = '#f5f5f5'; // Change background color when read
        alert('Message marked as read!');
    }

    // Function to delete a message
    function deleteMessage(event) {
        let messageItem = event.target.closest('.message-item');
        messageItem.remove();
        alert('Message deleted!');
    }

    // Event listener for search input
    document.getElementById('searchInput').addEventListener('input', searchMessages);
