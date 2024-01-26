const {
    validators: { validateId },
    errors: { ExistenceError, UnknownError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    // return Promise.all([
    //     User.findById(userId).lean(),
    //     Post.findById(postId, '-_id -__v -likes -date -author').lean()
    // ])
    //     .then(([user, post]) => {Existenec
    //         if (!user) throw new Error(`user with id ${userId} not found`)
    //         if (!post) throw new Error(`post with id ${postId} not found`)

    //         return post
    //     })

    return (async () => {
        try {
            const [user, post] = await Promise.all([User.findById(userId).lean(), Post.findById(postId, '-_id -likes -date -author').lean()
            ])
            delete post.__v
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with id ${postId} not found`)

            return post
        } catch (error) {
            throw new UnknownError(error)
        }
    })()
}