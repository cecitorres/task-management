import {
  initHeader
} from "./header.js";
import {
  initModal,
  hideModal
} from "./modal.js";
import {
  saveTask,
  getTasksByUSer,
  deleteTask,
  updateTask
} from "./api/task.js";
import {
  getCurrentUser
} from "./api/user.js";

// Create task when click on "Add task" button
function createTaskListener() {
  document.querySelector("#createTask").addEventListener("click", function () {
    let title = document.querySelector("#taskTitle").value;
    let description = document.querySelector("#taskDescription").value;
    if (title === "" || description === "") {
      alert("Please fill all fields");
      return;
    }
    saveTask({
      title,
      description,
      userId: getCurrentUser().id
    });
    document.querySelector("#taskTitle").value = "";
    document.querySelector("#taskDescription").value = "";
    hideModal();
    printTasks();
  });
}

// Print tasks
function printTasks() {
  document.querySelector("#taskList").innerHTML = '';
  // List tasks from LocalStorage
  let taskList = getTasksByUSer(getCurrentUser().id);
  // If there are no tasks, print "No tasks"
  if (taskList.length === 0) {
    document.querySelector("#taskList").innerHTML = `
    <div class="flex flex-col h-full w-full justify-center">
      <p class="text-center text-gray-500">No tasks added yet</p>
    </div>
  `;
    return;
  }
  // Print tasks
  taskList.forEach(function (task) {
    let taskItem = document.createElement("div");

    taskItem.classList.add("max-w-2xl", "mx-2");
    taskItem.setAttribute("id", task.id);
    taskItem.innerHTML = `
    <div class="p-4 overflow-hidden shadow-md min-w-[20rem] min-h-[20rem]">
        <!-- card header -->
        <div class="px-6 py-4 bg-white font-bold uppercase">${task.title}</div>

        <!-- card body -->
        <div class="px-6 bg-white">
          ${task.description}
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
    taskItem.querySelector("button:last-child").addEventListener("click", function () {
      removeTask(task.id);
    });
    // Update button
    taskItem.querySelector("button:first-child").addEventListener("click", function () {
      // Show edit card
      showEditCard(task);
    });
    document.querySelector("#taskList").appendChild(taskItem);
  });
}

// Edit task
function showEditCard(task) {
  // Find task card by id
  let taskCard = document.getElementById(task.id);
  console.log(taskCard);
  // Test edit card
  let taskItem = document.createElement("div");

  taskItem.classList.add("max-w-2xl", "mx-2");
  taskItem.setAttribute("id", task.id);
  taskItem.innerHTML = `
  <div class="p-4 overflow-hidden shadow-md min-w-[20rem] min-h-[20rem]">
      <!-- edit title -->
      <input
        type="text"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="editTaskTitle"
        placeholder="Example label"
        value="${task.title}"
      />
      <div class="h-4"></div>
      <!-- edit description -->
      <textarea
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="editTaskDescription"
        rows="3"
        placeholder="Your message"
      >${task.description}</textarea>
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
  taskItem.querySelector("button:first-child").addEventListener("click", function () {
    // Update task
    const title = document.querySelector("#editTaskTitle").value;
    const description = document.querySelector("#editTaskDescription").value;
    if (title === "" || description === "") {
      alert("Please fill in all fields");
      return;
    }
    updateTask({
      id: task.id,
      title,
      description
    });
    printTasks();
  });
  // Cancel button
  taskItem.querySelector("button:last-child").addEventListener("click", function () {
    printTasks();
  });
  taskCard = taskCard.parentNode.replaceChild(taskItem, taskCard);
}

// Delete task
function removeTask(id) {
  deleteTask(id);
  printTasks();
}

initHeader();
initModal();
createTaskListener();
printTasks();