import {
  getUsers
} from "../api/user.js";

// Login user to LocalStorage and check if user exists and password is correct
function login(email, password) {
  let users = getUsers();
  let user = users.find(function (user) {
    return user.email === email && user.password === password;
  });
  if (user === undefined) {
    throw new Error("Email or password is incorrect");
    return;
  }
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

// Logout user from LocalStorage
function logout() {
  localStorage.removeItem("user");
  location.assign("/index.html");
}

export {
  login,
  logout
};