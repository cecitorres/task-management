// Get all tasks from LocalStorage
function getTasks() {
  let tasks = localStorage.getItem("taskList");
  if (tasks === null) {
    return [];
  }
  return JSON.parse(tasks);
}

// Get tasks from LocalStorage
function getTasksByUSer(userId) {
  let tasks = getTasks();
  tasks = tasks.filter(function (task) {
    return task.userId === userId;
  });
  return tasks;
}

// Save task in LocalStorage
function saveTask({
  title,
  description,
  userId
}) {
  const tasks = getTasks();
  const task = {
    id: Date.now(),
    title,
    description,
    userId,
  };
  tasks.push(task);
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

// Delete task from LocalStorage
function deleteTask(taskId) {
  let tasks = getTasks();
  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

// Update task in LocalStorage
function updateTask({
  id,
  title,
  description
}) {
  const tasks = getTasks();
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.title = title;
      task.description = description;
    }
  });
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

export {
  getTasksByUSer,
  saveTask,
  deleteTask,
  updateTask
};