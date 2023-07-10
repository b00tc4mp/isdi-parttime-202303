const { ObjectId } = require('mongodb');

const context = require('./context');
const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

/**
 * Retrieves a user by their ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<object>} - A promise that resolves to the retrieved user object.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {TypeError} - on userId wrong type.
 * @throws {ContentError} - on userId wrong characters.
 */

const retrieveUser = (userId) => {
  validateId(userId, 'user id');

  const { users } = context,
    objectId = new ObjectId(userId);

  return users.findOne({ _id: objectId }).then((foundUser) => {
    if (!foundUser) throw new ExistenceError('user not exists');

    delete foundUser.password;
    delete foundUser.favourites;

    return foundUser;
  });
};

module.exports = retrieveUser;
