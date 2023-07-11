const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function toggleLikePost(userId, postId) {

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            if (!post) throw new ExistanceError(`Post with id ${postId} not found`)

            if (post.visibility === 'private') post.visibility = 'public'
            else post.visibility = 'private'

            return post.save()
        })
}
