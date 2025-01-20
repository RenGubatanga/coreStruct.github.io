// Array to store user data
let users = [];

// Elements
const formTitle = document.getElementById("form-title");
const actionBtn = document.getElementById("action-btn");
const toggleLink = document.getElementById("toggle-link");
const toggleText = document.getElementById("toggle-text");
const signupFields = document.getElementById("signup-fields");
const errorMessage = document.getElementById("error-message");
const authForm = document.getElementById("auth-form");

// State to toggle between login and signup
let isSignup = false;

// Toggle between Login and Signup
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isSignup = !isSignup;

  if (isSignup) {
    formTitle.textContent = "Create an Account";
    actionBtn.textContent = "Sign Up";
    toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-link">Log in here</a>';
    signupFields.style.display = "block";
  } else {
    formTitle.textContent = "Login to your Account";
    actionBtn.textContent = "Login";
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-link">Sign up here</a>';
    signupFields.style.display = "none";
  }
  errorMessage.style.display = "none";
});

// Handle form submission
actionBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (isSignup) {
    // Sign up logic
    if (name === "" || email === "" || password === "") {
      showError("All fields are required.");
      return;
    }

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      showError("Email is already registered.");
    } else {
      const newUser = { name, email, password };
      users.push(newUser);
      // Save user data to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      alert("Account created successfully! You can now log in.");
      resetForm();
      toggleLink.click(); // Switch to login view
    }
  } else {
    // Login logic
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      // Save user data to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert(`Welcome back, ${user.name}!`);
      resetForm();
      // Redirect to profile page
      window.location.href = "profile.html";
    } else {
      showError("Invalid email or password.");
    }
  }
});

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Reset form fields
function resetForm() {
  authForm.reset();
  errorMessage.style.display = "none";
}
