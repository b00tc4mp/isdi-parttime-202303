const context = require('./context');
const {
  validators: { validateId, validatePassword },
} = require('com');
const { ObjectId } = require('mongodb');

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

  return context.users
    .findOne({ _id: new ObjectId(userId) })
    .then((foundUser) => {
      if (!foundUser) throw new Error(`user with id ${userId} not exists`);

      if (password !== foundUser.password) throw new Error('wrong password');

      return context.users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: newPassword } }
      );
    });
};

module.exports = updateUserPassword;
