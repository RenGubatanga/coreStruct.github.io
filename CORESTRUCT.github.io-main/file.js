// Show the file upload modal
document.getElementById('upload-btn').addEventListener('click', () => {
    document.getElementById('upload-modal').style.display = 'flex';
});
  
// Close the file upload modal
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('upload-modal').style.display = 'none';
});
  
// Handle file upload
document.getElementById('submit-upload').addEventListener('click', () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result; // Base64 string
            const fileName = file.name;
            const fileSize = file.size;
            const fileDateCreated = new Date().toLocaleString();
            const fileDateModified = new Date().toLocaleString();
            const modifiedBy = "User"; // Modify this as needed

            // Store the file details in localStorage
            let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
            files.push({ fileName, fileSize, fileDateCreated, fileDateModified, modifiedBy, fileContent });
            localStorage.setItem('uploadedFiles', JSON.stringify(files));

            // Add file to the table
            addFileToTable({ fileName, fileSize, fileDateCreated, fileDateModified, modifiedBy, fileContent });

            // Close the modal
            document.getElementById('upload-modal').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});
  
// Add file to table
function addFileToTable(file) {
    const tbody = document.querySelector('#file-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${file.fileName}</td>
      <td>${file.fileDateCreated}</td>
      <td>${file.fileDateModified}</td>
      <td>${file.modifiedBy}</td>
      <td>${(file.fileSize / 1024).toFixed(2)} KB</td>
      <td>
        <button class="download-btn">Download</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    tbody.appendChild(row);

    // Add event listener to delete button
    row.querySelector('.delete-btn').addEventListener('click', () => {
        deleteFile(file);
    });

    // Add event listener to download button
    row.querySelector('.download-btn').addEventListener('click', () => {
        downloadFile(file);
    });
}

// Download file from table
function downloadFile(file) {
    const link = document.createElement('a');
    link.href = file.fileContent; // Base64 or Blob URL
    link.download = file.fileName; // Filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
  
// Delete file
function deleteFile(file) {
    // Get the uploaded files from localStorage
    let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    // Remove the file from the array
    files = files.filter(f => f.fileName !== file.fileName);

    // Save the updated list back to localStorage
    localStorage.setItem('uploadedFiles', JSON.stringify(files));

    // Remove the file row from the table
    const rows = document.querySelectorAll('#file-table tbody tr');
    rows.forEach(row => {
        if (row.children[0].textContent === file.fileName) {
            row.remove();
        }
    });
}
  
// Load files from localStorage when the page loads
window.addEventListener('load', () => {
    const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    files.forEach(file => {
        if (file.fileContent) {
            addFileToTable(file);
        }
    });
});