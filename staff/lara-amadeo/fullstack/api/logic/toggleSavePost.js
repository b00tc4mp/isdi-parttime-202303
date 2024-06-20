const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function toggleSavePost(userId, postId) {

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            if (!post) throw new ExistanceError(`Post with id ${postId} not found`)

            if (!user.savedPosts.some(id => id.toString() === postId)) {
                user.savedPosts.push(postId)
                post.saves.push(userId)

                return Promise.all([user.save(), post.save()])
            }
            else {
                const indexInUser = user.savedPosts.findIndex(id => id.toString() === postId)
                user.savedPosts.splice(indexInUser, 1)

                const indexInPost = post.saves.findIndex(id => id.toString() === userId)
                post.saves.splice(indexInPost, 1)

                return Promise.all([user.save(), post.save()])
            }
        })
        .then(() => { })
}