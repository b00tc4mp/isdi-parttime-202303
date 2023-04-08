import users from './users/data.mjs';

import { validateUserPassword, validatePasswordChange, validateNewPassword } from "./users/validators.mjs";

export const updateUserPassword = (id, oldPassword, repeatPassword, newPassword) => {
  validateNewPassword(newPassword, repeatPassword);
  validateUserPassword(id, oldPassword);
  validatePasswordChange(id, newPassword)
  users.filter((user) => {
    if (user.id === id) user.password = newPassword;
  });
};