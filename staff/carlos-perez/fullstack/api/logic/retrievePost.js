const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId, '-_id -__v -likes -date -author').lean()
    ])
        .then(([user, post]) => {
            if (!user) throw new Error(`user with id ${userId} not found`)
            if (!post) throw new Error(`post with id ${postId} not found`)

            return post
        })
}