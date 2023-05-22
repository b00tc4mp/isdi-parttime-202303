import { saveUser } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { updatePasswordValidation, validateId } from './helpers/validators.js';

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
