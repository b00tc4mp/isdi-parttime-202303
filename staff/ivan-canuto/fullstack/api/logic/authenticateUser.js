const {
  validators: { validateEmail, validatePassword, },
  errors: { ExistenceError, AuthError }
} = require('com')
const context = require('./context')

/**
 * Authenticates a user against his/her credentials
 * 
 * @param {string} email The user email 
 * @param {*} password The user password
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

  const { users } = context

  return users.findOne({ email })
    .then(user => {
      if(!user) throw new ExistenceError('User not found.')

      if(password !== user.password) throw new AuthError('Wrong credentials.')

      return user._id.toString()
    })
}