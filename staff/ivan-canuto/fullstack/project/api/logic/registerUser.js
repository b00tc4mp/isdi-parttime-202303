const { 
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError }
} = require('com')
require('dotenv').config()
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

/**
 * Registers a new user
 * 
 * @param {string} name A name entered by the user
 * @param {string} email An email enntered by the user
 * @param {string} password A password entered by the user
 * 
 * @returns {promise} A Promise that resolves when the registration is successful, or rejects with an error message if registration fails
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

  return (async () => {
    try {
      const hash = await bcrypt.hash(password, 10)
      
      await User.create({ name, email, password: hash, avatar: null, favs: [] })
    } catch (error) {
      if(error.message.includes('E11000'))
        throw new DuplicityError(`User with email ${email} already exists.`)

      throw error
    }
  })()
}