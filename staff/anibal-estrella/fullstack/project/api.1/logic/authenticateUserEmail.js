const {
    validators: { validateEmail },
    errors: { ExistenceError }
} = require('com')

const { User } = require('../data-project/models.js')

/**
 * Api/AuthenticateUserEmail:
 * Authenticate a user against its email
 * 
 * @param {string} email 
 * 
 * @returns {Promise<string>} The user ID
 * Errors:
 * @throws {TypeError} on non-string email
 * @throws {ContentError} on empty email
 * @throws { ExistenceError} on non-existing user
 */
module.exports = (email) => {
    validateEmail(email)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new ExistenceError('user email not found')
            return user.id
        })
}