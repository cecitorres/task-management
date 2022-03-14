import {
  getUsers,
  saveUser,
} from './api/user.js';

// If no users, create admin user
function init() {
  let users = getUsers();
  if (users.length === 0) {
    saveUser({
      email: 'admin@gmail.com',
      password: '12345',
      name: 'Admin',
      isAdmin: true
    });
  }
}

init();
