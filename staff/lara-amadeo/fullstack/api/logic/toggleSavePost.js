const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function toggleSavePost(userId, postId) {
    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
        .then(([user, post]) => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            if (!post) throw new Error(`Post with id ${postId} not found`)

            if (!user.savedPosts.some(id => id.toString() === postId)) {
                user.savedPosts.push(new ObjectId(postId))
                post.saves.push(new ObjectId(userId))
            }
            else {
                const indexInUser = user.savedPosts.findIndex(id => id.toString() === postId)
                user.savedPosts.splice(indexInUser, 1)

                const indexInPost = post.saves.findIndex(id => id.toString() === userId)
                post.saves.splice(indexInPost, 1)
            }
            return Promise.all([users.updateOne({ _id: new ObjectId(userId) }, { $set: { savedPosts: user.savedPosts } }), posts.updateOne({ _id: new ObjectId(postId) }, { $set: { saves: post.saves } })])
        })
}