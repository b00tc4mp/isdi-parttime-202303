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

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const post = await Post.findById(postId)

        if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

        const index = user.favs.findIndex((id) => id.toString() === postId)

        if (index < 0) {
            return User.updateOne(
                { _id: userId },
                { $push: { favs: postId } }
            )

        } else
            user.favs.splice(index, 1)

        return User.updateOne(
            { _id: userId },
            { $set: { favs: user.favs } }
        )
    })()
}

