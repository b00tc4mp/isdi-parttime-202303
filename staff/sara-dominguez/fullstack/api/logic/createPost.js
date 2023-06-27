const context = require('./context')
const { validators: { validateId, validatePostUrl, validateText, validateCallback } } = require('com')
const { ObjectId } = require('mongodb')


module.exports = function createPost(userId, image, text) {
    validateId(userId)
    validatePostUrl(image)
    validateText(text)

    const { users } = context
    const { posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')


            const post = {
                author: user._id,
                image,
                text,
                date: new Date,
                likes: []
            }

            return posts.insertOne(post)
        })
}