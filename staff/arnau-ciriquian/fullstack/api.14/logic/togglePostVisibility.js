const {
    validators: { validateId },
    errors: { ExistenceError, PropertyError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Toggles post visibility
 * 
 * @param {string} userId 
 * @param {string} postId 
 * 
 * @returns 
 * 
 * 
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

                    const visibility = post.visibility

                    if (visibility)
                        return Post.updateOne({ _id: postId }, { visibility: false })
                    else
                        return Post.updateOne({ _id: postId }, { visibility: true })
                })
        })
}