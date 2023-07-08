const {
    validators: { validateEmail, validatePassword },
    errors: { AuthError, ExistenceError }
} = require('com')

const { User } = require('../data/models.js')

/**
 * Api/AuthenticateUser:
 * Authenticate a user against its credentials
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise<string>} The user ID
 * Errors:
 * @throws {TypeError} on non-string email or password
 * @throws {ContentError} on empty email
 * @throws { RangeError} on password length lower than 8 characters
 * @throws { ExistenceError} on non-existing user
 * @throws {AuthError} on wrong credentials
 */

module.exports = (email, password,) => {
    validateEmail(email)
    validatePassword(password)

    return User.find({ email })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (user.password !== password) throw new AuthError('wrong credentials')

            return user.id
        })
}