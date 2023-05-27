import { saveUser } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import {
  updatePasswordValidation,
  validateId,
  validatePassword,
} from './helpers/validators.js';

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm,
  callback
) => {
  validateId(userId, 'user id');
  validatePassword(password, 'password');
  validatePassword(newPassword, 'new password');
  validatePassword(newPasswordConfirm, 'new password confirm');

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error('user not found'));

      return;
    }

    const newPasswordValid = updatePasswordValidation(
      foundUser.info.password,
      password,
      newPassword,
      newPasswordConfirm
    );

    foundUser.info.password = newPasswordValid;

    saveUser(foundUser, () => callback(null));
  });
};

export default updateUserPassword;
