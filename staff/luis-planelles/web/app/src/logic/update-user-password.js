//
import { findUserById } from './helpers/data-managers.js';
import { updatePasswordValidation } from './helpers/validators.js';

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm
) => {
  const foundUser = findUserById(userId);
  if (!foundUser) throw new Error("user doesn't exists");

  const newPasswordValid = updatePasswordValidation(
    foundUser.info.password,
    password,
    newPassword,
    newPasswordConfirm
  );
  foundUser.info.password = newPasswordValid;
};

export default updateUserPassword;
