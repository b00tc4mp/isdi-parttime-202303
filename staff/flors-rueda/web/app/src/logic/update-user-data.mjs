import users from './data/users/data.mjs'

import { validateName, validateUserPassword, validateMail, validateNewUsername } from './data/users/validators.mjs';

export const updateName = (id, newName, password) => {
  validateName(newName)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.name = newName;
  });
};
  
export const updateUserMail = (id, newMail, password) => {
  validateMail(newMail)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.mail = newMail;
  });
};
  
export const updateUserAvatar = (id, newAvatar, password) => {
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.avatar = newAvatar
  });
};

export const updateUsername = (id, newUsername, password) => {
  let username = '@' + newUsername.toLowerCase()
  validateNewUsername(username)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.username = username
  });
};