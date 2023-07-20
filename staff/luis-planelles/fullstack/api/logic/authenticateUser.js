const {
  validators: { validateEmail, validatePassword },
  errors: { ExistenceError, AuthError },
} = require('com');
const { User } = require('../data/models');

/**
 * Authenticates a user by validating their email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - A promise that resolves to the user ID as a string.
 * @throws {ExistenceError} - If the user does not exist.
 * @throws {AuthError} - If the provided credentials are incorrect.
 * @throws {TypeError} - on password or email arent a string.
 * @throws {RangeError} - on password length is lower than 8 characters.
 * @throws {ContentError} - on password or email not content expected characters.
 */

const authenticateUser = (email, password) => {
  validateEmail(email);
  validatePassword(password);

  return (async () => {
    const foundUser = await User.findOne({ email });

    if (!foundUser) throw new ExistenceError('user not exist');

    if (foundUser.password !== password)
      throw new AuthError('wrong credentials');

    return foundUser.id;
  })();
};

module.exports = authenticateUser;
