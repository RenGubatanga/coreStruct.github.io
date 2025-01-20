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
    alert('Menu toggle functionality to be added');
  };
});
// Upload Course Material (Instructor)
function uploadCourseMaterial(materialName, fileContent) {
  let courseMaterials = JSON.parse(localStorage.getItem('courseMaterials')) || [];
  courseMaterials.push({ name: materialName, content: fileContent });
  localStorage.setItem('courseMaterials', JSON.stringify(courseMaterials));
  alert('Material uploaded successfully!');
}

// Download Course Material (Student)
function downloadCourseMaterial(materialName) {
  let courseMaterials = JSON.parse(localStorage.getItem('courseMaterials')) || [];
  let material = courseMaterials.find(item => item.name === materialName);
  if (material) {
    console.log(`Downloading ${material.name}: ${material.content}`);
  } else {
    alert('Material not found!');
  }
}

// Example usage
uploadCourseMaterial('Math Syllabus', 'Syllabus content goes here...'); // Instructor uploads material
downloadCourseMaterial('Math Syllabus'); // Student downloads material