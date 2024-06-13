const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const { User } = require('../data/models')

/**
 * Authenticates a user againts his/her credentials
 * 
 * @param {string} email User email
 * @param {string} password User password
 * 
 * @returns {Promise<string>} User id
 * 
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty email or password
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */
module.exports = (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (user.password !== password) throw new AuthError('wrong password')

            return user.id
        })
}