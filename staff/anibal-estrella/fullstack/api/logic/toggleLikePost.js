const {
    errors: { ExistenceError, ContentError },
    validators: { validateId } } = require('com')

const { User, Post } = require('../data/models.js')

/**
 * 
 * @param {*} userId the user's ID
 * @param {*} postId the post's ID
 * @param {*} promise 
 */

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([
        User.findById(userId).lean(),

        Post.findById(postId, '-_id -__v -likes').lean(),
    ])

        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            const index = post.likes.findIndex((id) => id.toString() === userId)

            if (index < 0)
                return Post.updateOne(
                    { _id: postId }, { $push: { likes: userId } })
            else
                return Post.updateOne(
                    { _id: postId }, { $pull: { likes: userId } })

        })
        .then(() => { })
}