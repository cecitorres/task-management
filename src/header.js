import {
  getCurrentUser,
} from "./api/user.js";

import {
  logout
} from "./services/login.js";

function logoutListener() {
  document.getElementById("logout").addEventListener("click", function () {
    logout();
  });
}

// Add user name to header to id headerTitle
function setUserName() {
  const user = getCurrentUser();
  document.querySelector("#headerTitle").innerHTML = `Hello ${user.name}`;
}

function initHeader() {
  setUserName();
  logoutListener();
}

export { initHeader };