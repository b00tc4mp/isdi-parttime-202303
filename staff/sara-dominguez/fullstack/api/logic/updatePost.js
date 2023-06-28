require('dotenv').config()
const context = require('./context')
const { objectId } = require('mongodb')
const { validators: { validateId, validatePostUrl, validateText } } = require('com')
const { validatePostUrl } = require('com/validators')

module.exports = function updatePost(userId, postId, imageUrl, text) {
    validateId(userId)
    validateId(postId)
    validatePostUrl(imageUrl)
    validateText(text)

    const { users, posts } = context

    return Promise.all([users.find().toArray(), posts.find().toArray])

        .then(([users, posts]) => {
            const user = users.findOne({ _id: new ObjectId(userId) })

            if (!user) throw new Error('user not found')

            const post = posts.findOne({ _id: new ObjectId(postId) })

            if (!post) throw new Error('user not found')

            if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

            return post.updateOne({ _id: new ObjectId(postId) }, { $set: { image: imageUrl, text: text } })
        })





}





