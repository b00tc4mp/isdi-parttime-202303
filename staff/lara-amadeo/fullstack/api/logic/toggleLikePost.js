const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function toggleLikePost(userId, postId, callback) {


    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
        .then(([user, post]) => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            if (!post) throw new Error(`Post with id ${postId} not found`)

            if (!user.likedPosts.includes(postId)) {
                post.likes.push(userId)
                user.likedPosts.push(postId)
            } else {
                const indexPostInUser = user.likedPosts.findIndex(elem => elem === postId)
                user.likedPosts.splice(indexPostInUser, 1)

                const indexUserInPost = post.likes.findIndex(elem => elem === userId)
                post.likes.splice(indexUserInPost, 1)
            }

            return Promise.all([users.updateOne({ _id: new ObjectId(userId) }, { $set: { likedPosts: user.likedPosts } }), posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })])
        })
}