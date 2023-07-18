const {
  validators: { validateId, validatePassword },
  errors: { ExistenceError },
} = require('com');

const { User } = require('../data/models');

/**
 * Updates the password of a user with the provided new password.
 * @param {string} userId - The ID of the user whose password to update.
 * @param {string} password - The current password of the user.
 * @param {string} newPassword - The new password for the user.
 * @param {string} newPasswordConfirm - The confirmation of the new password.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {Error} - If the current password is incorrect, the new password equals the old password,
 *                   or the password confirmation does not match.
 * @throws {TypeError} - on userId or password wrong type.
 * @throws {ContentError} - on userId or password wrong characters.
 * @throws {RangeError} - on password wrong range.
 */

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm
) => {
  validateId(userId, 'user id');
  validatePassword(password);
  validatePassword(newPassword, 'new password');
  validatePassword(newPasswordConfirm, 'new password confirm');

  if (newPassword === password)
    throw new Error('new password equals old password');

  validatePassword(newPasswordConfirm, 'new password confirm');

  if (newPassword !== newPasswordConfirm)
    throw new Error('password confirmation mismatch');

  return User.findById(userId).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    if (password !== foundUser.password) throw new Error('wrong password');

    return User.updateOne(
      { _id: userId },
      { $set: { password: newPassword } }
    ).then(() => {});
  });
};

module.exports = updateUserPassword;
