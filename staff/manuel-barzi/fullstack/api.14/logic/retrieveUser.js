const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

/**
 * Retrieves a user by id
 * 
 * @param {string} userId ...
 * @returns {Promise<Object>} ...
 */
module.exports = userId => {
    validateId(userId, 'user id')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            // sanitize

            delete user._id
            delete user.password
            delete user.favs

            return user
        })
}