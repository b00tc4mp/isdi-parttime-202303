const {
    validators: { validateId },
    errors: { ExistenceError, PropertyError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Deletes the current post
 * 
 * @param {string} userId User id
 * @param {string} postId Post id
 * 
 * @returns
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ExistenceError} On non-existing user or post
 */
module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Post.findById(postId)
                .then(post => {
                    if (!post) throw new ExistenceError('post not found')

                    if (!post.author.equals(userId)) throw new PropertyError(`post with id ${postId} does not belong to user with id ${userId}`)

                    return Post.deleteOne({ _id: postId })
                })
        })
}