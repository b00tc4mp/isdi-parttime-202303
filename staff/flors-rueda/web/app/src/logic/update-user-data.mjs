import users from './users/data.mjs'

import { validateName, validateUserPassword, validateMail } from './users/validators.mjs';

export const updateUserName = (id, newName, password) => {
  validateName(newName)
  validateUserPassword(id, password)
  users.filter((user) => {
    if (user.id === id) user.name = newName;
  });
};
  
export const updateUserMail = (id, newMail, password) => {
  validateUserPassword(id, password)
  validateMail(newMail)
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