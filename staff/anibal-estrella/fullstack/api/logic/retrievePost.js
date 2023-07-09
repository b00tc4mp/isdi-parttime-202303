const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([
        User.findById(userId).lean(),
        //remove post _id... client only asks for text and image to render
        Post.findById(postId, '-_id -__v -likes -date -author').lean(),

    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            return post
        })
}
