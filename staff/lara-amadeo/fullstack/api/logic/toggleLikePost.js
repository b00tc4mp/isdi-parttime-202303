const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function toggleLikePost(userId, postId) {
    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
        .then(([user, post]) => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            if (!post) throw new Error(`Post with id ${postId} not found`)

            if (!user.likedPosts.some(fav => fav.toString() === postId)) {
                post.likes.push(new ObjectId(userId))
                user.likedPosts.push(new ObjectId(postId))
            } else {
                const indexPostInUser = user.likedPosts.findIndex(id => id.toString() === postId)
                user.likedPosts.splice(indexPostInUser, 1)

                const indexUserInPost = post.likes.findIndex(id => id.toString() === userId)
                post.likes.splice(indexUserInPost, 1)
            }

            return Promise.all([users.updateOne({ _id: new ObjectId(userId) }, { $set: { likedPosts: user.likedPosts } }), posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })])
        })
}