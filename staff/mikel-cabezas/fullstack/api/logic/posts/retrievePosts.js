const context = require('../context')
const { ObjectId } = require('mongodb')
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

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }

    return Promise.all([users.find().toArray(), posts.find().toArray()])
        .then(([users, posts]) => {
            const user = users.find(user => user._id.toString() === userId)

            if (!user) new ExistenceError(`User with id ${userId} not found`)

            posts.forEach(post => {
                post.id = post._id.toString()

                delete post._id

                const author = users.find(user => user._id.toString() === post.author.toString())

                const { _id, name, avatar } = author

                post.author = {
                    id: _id.toString(),
                    name,
                    avatar
                }

                post.fav = users.favs?.some(fav => fav.toString() === post === post.id)
            })

            return posts
        })
}