const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User } = require('../data/models');

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

  return (async () => {
    const foundUser = await User.findById(
      userId,
      '-password -favourites'
    ).lean();

    if (!foundUser) throw new ExistenceError('user not exists');

    return foundUser;
  })();
};

module.exports = retrieveUser;
