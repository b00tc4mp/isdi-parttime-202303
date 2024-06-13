const {
    validators: { validateId, validateName, validatePassword },
    errors: { ExistenceError, AuthError, ContentError }
} = require('com')
const { User } = require('../data/models')

/**
 * Updates User name
 * 
 * @param {string} userId User name
 * @param {string} oldUsername User actual name
 * @param {string} newUsername User new name
 * @param {string} password User password
 * 
 * @returns
 * 
 * @throws {TypeError} On non-string name, new name or password
 * @throws {ContentError} On empty name, new name or password
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 * */
module.exports = (userId, oldUsername, newUsername, password) => {
    validateId(userId)
    validateName(oldUsername, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)

    if (newUsername === oldUsername) throw new AuthError('new username is equal to old username')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (oldUsername !== user.name) throw new ContentError('old username is not correct')

            if (password !== user.password) throw new AuthError('password is not correct')

            return User.updateOne({ '_id': userId }, { name: newUsername })
        })
}