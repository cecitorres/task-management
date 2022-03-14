import {
  login
} from "./services/login.js";

// Add click event to login button
function loginFormListener() {
  document.querySelector("#loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Get email and password from form
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }
    // Login user
    try {
      const user = login(email, password);
      if (user.isAdmin) {
        location.assign("/src/users.html");
        return;
      }
      location.assign("/src/tasks.html");
    } catch (error) {
      alert("Invalid email or password");
    }
  });
}

loginFormListener();
