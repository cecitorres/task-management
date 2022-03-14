import {
  initHeader
} from "./header.js";
import {
  initModal,
  hideModal
} from "./modal.js";
import {
  getNotAdminUsers,
  deleteUser,
  saveUser,
  updateUser
} from "./api/user.js";

// Create user when click on "Add user" button
function createUserListener() {
  document.querySelector("#createUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.querySelector("#userName").value;
    let email = document.querySelector("#userEmail").value;
    let password = document.querySelector("#userPassword").value;
    saveUser({
      email,
      password,
      name,
      isAdmin: false
    });
    document.querySelector("#userName").value = "";
    document.querySelector("#userEmail").value = "";
    document.querySelector("#userPassword").value = "";
    hideModal();
    printUsers();
  });
}

// Print users
function printUsers() {
  document.querySelector("#userList").innerHTML = '';
  // List users from LocalStorage
  let userList = getNotAdminUsers();
  // If there are no users, print "No users"
  if (userList.length === 0) {
    document.querySelector("#userList").innerHTML = `
    <div class="flex flex-col h-full w-full justify-center">
      <p class="text-center text-gray-500">No users added yet</p>
    </div>
  `;
    return;
  }
  // Print users
  userList.forEach(function (user) {
    let userItem = document.createElement("div");
    userItem.classList.add("max-w-2xl", "mx-2");
    userItem.setAttribute("id", user.id);
    userItem.innerHTML = `
    <div class="p-4 overflow-hidden shadow-md min-w-[20rem] min-h-[20rem]">
      <!-- card header -->
      <div class="px-6 py-4 bg-white font-bold">${user.name}</div>
      <!-- card body -->
        <div class="px-6 bg-white">
          ${user.email}
        </div>
      <!-- card footer -->
        <div class="p-6 bg-white">
          <!-- button link -->
          <button
            class="bg-blue-500 shadow-md p-2 rounded-full w-10 hover:bg-blue-300 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </button>
          <button
            class="bg-blue-500 shadow-md p-2 rounded-full w-10 hover:bg-blue-300 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
    </div>
  `;
    // Delete button
    userItem.querySelector("button:last-child").addEventListener("click", function () {
      removeUser(user.id);
    });
    // Edit button
    userItem.querySelector("button:first-child").addEventListener("click", function () {
      showUpdateUser(user);
    });
    document.querySelector("#userList").appendChild(userItem);
  });
}

// Edit user
function showUpdateUser(user) {
  // Find user card by id
  let userCard = document.getElementById(user.id);
  // Test edit card
  let userItem = document.createElement("div");

  userItem.classList.add("max-w-2xl", "mx-2");
  userItem.setAttribute("id", user.id);
  userItem.innerHTML = `
  <div class="p-4 overflow-hidden shadow-md min-w-[20rem] min-h-[20rem]">
      <!-- edit name -->
      <input
        type="text"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="updateUserName"
        placeholder="Name"
        value="${user.name}"
      />
      <div class="h-4"></div>
      <!-- edit email -->
      <input
        type="text"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="updateUserEmail"
        placeholder="Email"
        value="${user.email}"
      />
      <!-- card footer -->
      <div class="flex flex-col bg-white">
        <!-- button link -->
        <button
          class="bg-green-500 text-white shadow-md p-2 rounded hover:bg-blue-300 my-2"
        >
          Update
        </button>
        <button
          class="bg-red-300 text-white shadow-md p-2 rounded hover:bg-blue-300 my-2"
        >
          Cancel
        </button>
      </div>
    </div>
  `;
  // Update button
  userItem.querySelector("button:first-child").addEventListener("click", function () {
    // Update user
    const email = document.getElementById("updateUserEmail").value;
    const name = document.getElementById("updateUserName").value;
    if (email === "" || name === "") {
      alert("Please fill all fields");
      return;
    }
    updateUser({
      id: user.id,
      name,
      email
    });
    printUsers();
  });
  // Cancel button
  userItem.querySelector("button:last-child").addEventListener("click", function () {
    printUsers();
  });
  userCard = userCard.parentNode.replaceChild(userItem, userCard);
}

// Delete user
function removeUser(id) {
  deleteUser(id);
  printUsers();
}

initHeader();
initModal();
createUserListener();
printUsers();
