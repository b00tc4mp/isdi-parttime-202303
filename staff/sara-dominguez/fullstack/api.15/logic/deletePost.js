const {
    validators: { validateId },
    errors: { ExistenceError, PropertyError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = function deletePost(userId, postId) {
    debugger
    validateId(userId)
    validateId(postId)


    return Promise.all([User.findById(userId), Post.findById(postId)])

        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not founf')

            if (!post) throw new ExistenceError('post not found')

            if (post.author.toString() !== userId) throw new PropertyError('Post author don`t belong to this user')


            return User.find({ favs: postId }).then((users) => {
                const usersUpdated = users.map(user => {
                    return User.updateOne(
                        { _id: user.id },
                        {
                            $pullAll: {
                                favs: [postId],
                            }
                        }
                    )
                })

                return Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
            })
        })

        .then(() => { })

}