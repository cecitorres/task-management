// Get user list from LocalStorage
function getUsers() {
  let userList = localStorage.getItem("userList");
  if (userList === null) {
    return [];
  }
  return JSON.parse(userList);
}

// Get not admin users from LocalStorage
function getNotAdminUsers() {
  let users = getUsers();
  users = users.filter(function (user) {
    return user.isAdmin === false;
  });
  return users;
}

// Get current user from LocalStorage
function getCurrentUser() {
  let user = localStorage.getItem("user");
  if (user === null) {
    throw new Error("User not found");
    return;
  }
  user = JSON.parse(user);
  return user;
}

// Save user in LocalStorage
function saveUser({
  email,
  password,
  name,
  isAdmin
}) {
  const userList = getUsers();
  const user = {
    id: Date.now(),
    email,
    password,
    name,
    isAdmin,
  };
  userList.push(user);
  localStorage.setItem("userList", JSON.stringify(userList));
}

// Delete user from LocalStorage
function deleteUser(userId) {
  let userList = getUsers();
  userList = userList.filter(function (user) {
    return user.id !== userId;
  });
  localStorage.setItem("userList", JSON.stringify(userList));
}

// Update user in LocalStorage
function updateUser({
  id,
  name,
  email
}) {
  const userList = getUsers();
  userList.forEach(function (user) {
    if (user.id === id) {
      user.email = email;
      user.name = name;
    }
  });
  localStorage.setItem("userList", JSON.stringify(userList));
}

export {
  getUsers,
  getNotAdminUsers,
  getCurrentUser,
  saveUser,
  deleteUser,
  updateUser,
};