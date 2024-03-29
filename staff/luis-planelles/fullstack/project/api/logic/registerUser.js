const {
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError, UnknowError },
} = require('com');

const { User } = require('../data/models');

/**
 * Registers a new user with the provided name, email, and password.
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the created user object.
 * @throws {DuplicityError} - If a user with the provided email already exists.
 * @throws {Error} - If any other error occurs during the registration process.
 * @throws {TypeError} - on name, text or password wrong type.
 * @throws {ContentError} - on name, text or password wrong characters.
 * @throws {RangeError} - on password wrong range.
 */

const registerUser = (name, email, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);

  return (async () => {
    try {
      await User.create({ name, email, password });
    } catch (error) {
      if (error.message.includes('E11000'))
        throw new DuplicityError(`user with email ${email} already exists`);

      throw new UnknowError(error.message);
    }
  })();
};

module.exports = registerUser;
