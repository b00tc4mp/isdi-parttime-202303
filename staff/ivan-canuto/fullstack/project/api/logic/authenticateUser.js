const {
  validators: { validateEmail, validatePassword },
  errors: { ExistenceError, AuthError }
} = require('com')
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

/**
 * Authenticates a user against his/her credentials
 * 
 * @param {string} email The user email 
 * @param {string} password The user password
 * 
 * @returns {Promise<string>} The user id
 * 
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty email
 * @throws {RangeError} On password length lower than 6 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */

module.exports = (email, password) => {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const user = await User.findOne({ email })
    if(!user) throw new ExistenceError('User not found.')

    const match = await bcrypt.compare(password, user.password)

    if(!match) throw new AuthError('Wrong credentials.')

    return user._id.toString()
  })()
}