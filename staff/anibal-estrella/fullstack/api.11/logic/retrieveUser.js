const { validators: { validateId },
    errors: { ExistenceError } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

/**
 *  * Api/retriveUser:
 * Retrieves a user by id
 * @param {string} userId 
 * @returns {Promise<string>} The user ID
 */

module.exports = userId => {
    validateId(userId, 'user Id')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            delete user._id
            delete user.password
            delete user.favs

            return user
        })
}