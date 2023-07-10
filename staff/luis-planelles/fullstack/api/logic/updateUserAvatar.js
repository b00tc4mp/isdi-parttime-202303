const context = require('./context');
const {
  validators: { validateId, validateUrl },
  errors: { ExistenceError },
} = require('com');
const { ObjectId } = require('mongodb');

/**
 * Updates the avatar of a user with the provided new avatar URL.
 * @param {string} userId - The ID of the user whose avatar to update.
 * @param {string} newAvatar - The new avatar URL for the user.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {TypeError} - on userId or url wrong type.
 * @throws {ContentError} - on userId or url wrong characters.
 */

const updateUserAvatar = (userId, newAvatar) => {
  validateId(userId, 'userId');
  validateUrl(newAvatar, 'avatar');

  return context.users
    .findOne({ _id: new ObjectId(userId) })
    .then((foundUser) => {
      if (!foundUser)
        throw new ExistenceError(`user with id ${userId} not exists`);

      return context.users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { avatar: newAvatar } }
      );
    });
};

module.exports = updateUserAvatar;
