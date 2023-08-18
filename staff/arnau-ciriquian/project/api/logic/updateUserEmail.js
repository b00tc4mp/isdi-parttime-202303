const {
    validators: { validateId, validateEmail },
    errors: { ExistenceError, AuthError, DuplicityError, ContentError }
} = require('com')
const { User } = require('../data/models')

/**
 * Updates the user email
 * 
 * @param {string} userId User id
 * @param {string} email Actual user email
 * @param {string} newEmail New user email
 * @param {string} newEmailConfirmation New user email
 * @param {string} password User password
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id, email, new email, new email confirmation or password
 * @throws {ContentError} On empty user id, email, new email, new email confirmation or password
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 * @throws {DuplicityError} On new email already on database
 */
module.exports = (userId, email, newEmail, password) => {
    validateId(userId, 'user id')
    validateEmail(newEmail, 'new email')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (user.email !== email) throw new AuthError(`email does not correspond to actual email`)

            return User.findOne({ email: newEmail })
                .then(_user => {

                    debugger

                    if (_user) throw new DuplicityError('new email already registered')

                    if (user.password !== password) throw new AuthError(`incorrect password`)

                    return User.updateOne({ '_id': userId }, { email: newEmail })
                })
        })
}