const {
    validators: { validateId },
    errors: { ExistenceError, PermitError },
} = require('com')
const { User, Post } = require('../../data/models')


module.exports = (userId, postId) => {
    validateId(userId, 'User ID')
    validateId(postId, 'Post ID')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const post = await Post.findById(postId)

        if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

        if (userId !== post.author.toString()) throw new PermitError(`Post with id ${postId} does not belong to user with id ${userId} `)

        const users = await User.find({ favs: postId })

        const usersUpdated = users.map((user) => {
            User.updateOne(
                { _id: user.id },
                { $pullAll: { favs: [postId] } }
            )
        })

        await Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
    })()
}