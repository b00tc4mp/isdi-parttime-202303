const { User, Post } = require('../../data/models')
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {*} userId 
 * @param {*} postId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized post 
 * 
 * @throws {TypeError} on non-string userId and/or postId (sync)
 * @throws {ContentError} on empty userId and/or postId (sync) 
 * 
 * @throws {ExistenceError} on user not found (async)
 * */
module.exports = (userId, postId) => {
    validateId(userId)
    validateId(postId)
    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId, '-_id -likes -date -__v').lean()
    ])
        .then(([user, post]) => {
            if (!user) new ExistenceError(`User with id ${userId} not found`)
            if (!post) new ExistenceError(`Post with id ${postId} not found`)

            if (post.author.toString() !== userId) throw new Error(`Post with id ${postId} does not belong to user with id ${userId}`)

            delete post.author

            return post

        })
}