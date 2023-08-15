const { User, Playground } = require('../../data/models')
const context = require('../context')
const { ObjectId } = require('mongodb')
const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')
/**
 * 
 * @param {string} userId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized filtered liked posts 
 * 
 * @throws {TypeError} on non-string userId (sync)
 * @throws {ContentError} on empty userId (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */
module.exports = userId => {
    validateUserId(userId)

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }

    return Promise.all(
        [User.findById(userId).lean(),
        Playground.find({ likes: { $in: userId } }).lean()
        ]
    ).then((playgrounds) => {
        return playgrounds[1]
    })
}
