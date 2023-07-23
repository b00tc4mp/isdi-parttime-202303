require('dotenv').config()
const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')

module.exports = function toggleLikePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    return Promise.all([User.findById({ _id: userId }), Post.findById({ _id: postId })])

        .then(([user, post]) => {

            if (!user) throw new TypeError('user not found')
            if (!post) throw new TypeError('user not found')


            const index = post.likes.findIndex(author => post.author.toString() === userId)
            if (index < 0) {
                return Post.updateOne({ _id: postId }, { $push: { likes: userId } })

            } else {
                post.likes.splice(post.likes.findIndex(likes => post.likes.toString() === user.id), 1)

                return Post.updateOne({ _id: postId }, { $set: { likes: post.likes } })
            }
        })
}