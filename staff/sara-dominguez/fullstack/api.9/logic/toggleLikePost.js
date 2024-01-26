require('dotenv').config()
const context = require('./context')
const { validators: { validateId } } = require('com')
const { ObjectId } = require('mongodb')

module.exports = function toggleLikePost(userId, postId) {
    validateId(userId)
    validateId(postId)


    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])

        .then(([user, post]) => {

            if (!user) throw new Error('user not found')
            if (!post) throw new Error('user not found')


            const index = post.likes.findIndex(id => id.toString() === userId)
            if (index < 0) {
                return posts.updateOne({ _id: new ObjectId(postId) }, { $push: { likes: new ObjectId(userId) } })

            } else {
                post.likes.splice(post.likes.findIndex(like => like === new ObjectId(userId)), 1)

                return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })
            }
        })
}