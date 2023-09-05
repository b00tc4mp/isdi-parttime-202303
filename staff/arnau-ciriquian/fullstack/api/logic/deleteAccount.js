const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User } = require('../data/models')


/**
 * Deletes the logged user account
 * 
 * @param {string} userId User id
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId) => {
    validateId(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return User.deleteOne({ _id: userId })
        })
}