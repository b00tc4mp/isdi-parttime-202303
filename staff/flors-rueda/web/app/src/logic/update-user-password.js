import users from './data/users/data.js';

import { validateUserPassword, validatePasswordChange, validateNewPassword } from "./data/users/validators.js";

export const updateUserPassword = (id, oldPassword, repeatPassword, newPassword) => {
  validateNewPassword(newPassword, repeatPassword);
  validateUserPassword(id, oldPassword);
  validatePasswordChange(id, newPassword)
  users.filter((user) => {
    if (user.id === id) user.password = newPassword;
  });
};