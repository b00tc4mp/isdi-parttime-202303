const {
    validators: { validateId },
    errors: { ExistenceErrorr }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Retrieves a single post
 * 
 * @param {string} userId User id
 * @param {string} postId Post id
 * 
 * @returns Post info corresponding to post id
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

                    return post
                })
        })
}
