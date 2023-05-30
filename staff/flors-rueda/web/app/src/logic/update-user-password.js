import users from './data/users/data.js';
import { saveUsers } from './data/users/data-managers.js';
import { validateUserPassword, validatePasswordChange, validateNewPassword, validateUserID } from './data/users/validators.js';

export const updateUserPassword = (id, oldPassword, repeatPassword, newPassword) => {
  validateNewPassword(newPassword, repeatPassword);
  validateUserID(id);
  validateUserPassword(id, oldPassword);
  validatePasswordChange(id, newPassword)
  users.filter((user) => {
    if (user.id === id) user.password = newPassword;
  });
  saveUsers();
};