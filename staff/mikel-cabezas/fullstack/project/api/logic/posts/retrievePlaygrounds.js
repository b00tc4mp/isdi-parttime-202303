const { User, Post } = require('../../data/models')

const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized posts 
  * 
 * @throws {TypeError} on non-string userId (sync)
 * @throws {ContentError} on empty userId (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */
module.exports = userId => {
    validateUserId(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().lean(),
    ])
        .then(([user, post]) => {

            if (!user) new ExistenceError(`User with id ${userId} not found`)

            // post.forEach(post => {
            //     post.id = post._id.toString()

            //     delete post._id

            // })

            return post
        })
}