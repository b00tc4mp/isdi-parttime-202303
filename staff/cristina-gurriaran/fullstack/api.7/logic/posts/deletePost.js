const {
    validators: { validateId },
    errors: { ExistenceError, PermitError },
} = require('com')
const { User, Post } = require('../../data/models')


module.exports = (userId, postId) => {
    validateId(userId, 'User ID')
    validateId(postId, 'Post ID')

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)
            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)
            if (userId !== post.author.toString()) throw new PermitError(`Post with id ${postId} does not belong to user with id ${userId} `)
            return User.find({ favs: postId }).then((users) => {
                const usersUpdated = users.map((user) => {
                    return User.updateOne(
                        { _id: user.id },
                        { $pullAll: { favs: [postId] }}
                    )
                })
                return Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
            })
        })
        .then(() => { })
}