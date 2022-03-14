import {
  saveUser
} from './api/user.js';
import {
  login
} from './services/login.js';

// Add event listener fo signup form
function signupFormListener() {
  document.querySelector("#signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Get name email and password from form
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (name === "" || email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }
    // Signup user
    try {
      saveUser({
        email,
        password,
        name,
        isAdmin: false
      });
      login(email, password);
      location.assign("/src/tasks.html");
    } catch (error) {
      alert("Invalid email or password");
    }
  });
}

signupFormListener();
