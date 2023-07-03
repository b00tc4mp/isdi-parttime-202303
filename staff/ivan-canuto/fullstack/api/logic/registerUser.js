const { 
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError }
} = require('com')
require('dotenv').config()
const context = require('./context')

/**
 * Registers a new user
 * 
 * @param {string} name A name entered by the user
 * @param {string} email An email enntered by the user
 * @param {string} password A password entered by the user
 * @returns {Promise}
 * 
 * @throws {TypeError} On non-string name, email or password
 * @throws {ContentError} On empty name or email
 * @throws {RangeError} On password length lower than 6 characters
 * @throws {DuplicityError} On existing user
 */

module.exports = (name, email, password) => {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const { users } = context

  return users.insertOne({ name, email, password, avatar: null, favs: [] })
  .catch(error => {
    if(error.message.includes('E11000'))
      throw new DuplicityError(`user with email ${email} already exists`)

    throw error
  })
}