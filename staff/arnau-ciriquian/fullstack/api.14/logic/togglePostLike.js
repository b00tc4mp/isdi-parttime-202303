const {
    validators: { validateId },
    errors: { ExistenceError, AuthError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Toggles a user like or dislike on a post
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

                    const likes = post.likes

                    const index = likes.findIndex((objectId) => objectId.equals(userId))

                    if (index < 0) {
                        likes.push(userId)

                        return Post.updateOne({ '_id': postId }, { 'likes': likes })
                    } else {
                        likes.splice(index, 1)

                        return Post.updateOne({ '_id': postId }, { 'likes': likes })
                    }
                })
        })
}