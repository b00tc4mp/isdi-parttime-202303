const { 
    validators: { validateId },
    errors: { ExistenceError }
 } = require('com')
const { User, Post } = require('../../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)
            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

            const index = post.likes.findIndex((id) => id.toString() === userId)

            if (index < 0) {
                return Post.updateOne(
                    { _id: postId },
                    { $push: { likes: userId } }
                )

            } else
                post.likes.splice(index, 1)

            return Post.updateOne(
                { _id: postId }, 
                { $set: { likes: post.likes } }
            )
        })
}

