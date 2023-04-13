import users from './data/users/data.js';
import { validateName, validateUserPassword, validateMail, validateNewUsername } from './data/users/validators.js';
import { saveUsers } from './data/users/data-managers.js';

export const updateName = (id, newName, password) => {
  validateName(newName)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.name = newName;
  });
  saveUsers()
};
  
export const updateUserMail = (id, newMail, password) => {
  validateMail(newMail)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.mail = newMail;
  });
  saveUsers()
};
  
export const updateUserAvatar = (id, newAvatar, password) => {
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.avatar = newAvatar
  });
  saveUsers()
};

export const updateUsername = (id, newUsername, password) => {
  let username = '@' + newUsername.toLowerCase()
  validateNewUsername(username)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.username = username
  });
  saveUsers();
};