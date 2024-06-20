const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function retrievePost(userId, postId) {
    return Promise.all([User.findById(userId).lean(), Post.findById(postId).lean()])

        .then(([user, post]) => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)
            if (!post) throw new ExistanceError(`Post with id ${postId} not found`)
            if (post.author.toString() !== userId) throw new ExistanceError(`Post with id ${postId} does not belong to user with id ${userId}`)

            post.id = post._id.toString()
            delete post._id

            return post
        })
}