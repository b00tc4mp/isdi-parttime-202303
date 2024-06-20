const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const post = await Post.findById(postId, '-_id -__v -likes -date -author').lean()

        if (!post) throw new ExistenceError(`post with id ${postId} not found`)

        return post
    })()
}


