const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function updatePost(userId, postId, image, text) {

    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
        .then(([user, post]) => {
            if (!user) throw new Error(`User with id ${userId} not found`)
            if (!post) throw new Error('Post not found')
            if (post.author.toString() !== userId) throw new Error(`Post with id ${post.id} does not belong to user with id ${post.author}`)

            return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { image: image, text: text } })
        })
}
