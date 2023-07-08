const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function updatePost(userId, postId, image, text) {

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)
            if (!post) throw new ExistanceError('Post not found')
            if (post.author.toString() !== userId) throw new ExistanceError(`Post with id ${post.id} and author ${post.author} does not belong to user with id ${userId}`)

            return Post.updateOne({ _id: postId }, { image: image, text: text })
        })
}
