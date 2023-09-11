const { 
  validators: { validateUsername, validateEmail, validatePassword, validateText },
  errors: { DuplicityError }
} = require('com')
require('dotenv').config()
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

/**
 * Registers a new user
 * 
 * @param {string} name The name of the user
 * @param {string} username The username attached to the user account
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {promise} A Promise that resolves when the registration is successful, or rejects with an error message if registration fails
 * 
 * @throws {TypeError} On non-string name, email or password
 * @throws {ContentError} On empty name or email
 * @throws {RangeError} On password length lower than 6 characters
 * @throws {DuplicityError} On existing user
 */

module.exports = (name, _username, email, password) => {
  validateText(name, 'name of the user')
  validateUsername(_username)
  validateEmail(email, 'user name')
  validatePassword(password, 'user password')

  return (async () => {
    try {
      const hash = await bcrypt.hash(password, 10)

      const username = _username.toLowerCase()
      
      await User.create({ name, username: username, email, password: hash, avatar: null, favs: [] })
    } catch (error) {
      if(error.message.includes('E11000'))
        throw new DuplicityError(`User with email ${email} already exists.`)

      throw error
    }
  })()
}