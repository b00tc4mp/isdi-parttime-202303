const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function toggleLikePost(userId, postId) {
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error(`Post with id ${postId} not found`)

                    if (post.visibility === 'private') post.visibility = 'public'
                    else post.visibility = 'private'

                    posts.updateOne({ _id: new ObjectId(postId) }, { $set: { visibility: post.visibility } })
                })
        })
}
