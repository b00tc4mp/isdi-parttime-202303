const context = require('./context');
const {
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError },
} = require('com');

/**
 * Registers a new user with the provided name, email, and password.
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the created user object.
 * @throws {DuplicityError} - If a user with the provided email already exists.
 * @throws {Error} - If any other error occurs during the registration process.
 */

const registerUser = (name, email, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);

  const { users } = context;

  return users
    .insertOne({
      name,
      email,
      password,
      avatar: null,
      favourites: [],
    })
    .catch((error) => {
      if (error.message.includes('E11000'))
        throw new DuplicityError(`user with email ${email} already exists`);

      throw error;
    });
};

module.exports = registerUser;
