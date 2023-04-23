//
import { findUserById } from './helpers/data-managers.js';
import { validateId, updatePasswordValidation } from './helpers/validators.js';
import { saveUser } from '../data.js';

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm
) => {
  validateId(userId, 'user id');

  const foundUser = findUserById(userId);
  if (!foundUser) throw new Error("user doesn't exists");

  const newPasswordValid = updatePasswordValidation(
    foundUser.info.password,
    password,
    newPassword,
    newPasswordConfirm
  );
  foundUser.info.password = newPasswordValid;

  saveUser(foundUser);
};

export default updateUserPassword;
