require('dotenv').config()
const context = require('./context')
const { validators: { validateId } } = require('com')

module.exports = function toggleLikePost(userId, postId) {
    validateId(userId)
    validateId(postId)


    const { users, posts } = context

    return Promise.all([users.find().toArray(), posts.find().toArray])

        .then(([users, posts]) => {
            const user = users.findOne({ _id: new ObjectId(userId) })

            if (!user) throw new Error('user not found')

            const post = posts.findOne({ _id: new ObjectId(postId) })

            if (!post) throw new Error('user not found')


            const index = post.likes.indexOf(userId)
            if (index < 0) {
                post.likes.push(userId)
            } else {
                post.likes.splice(index, 1)


            }

            return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })
        })
}