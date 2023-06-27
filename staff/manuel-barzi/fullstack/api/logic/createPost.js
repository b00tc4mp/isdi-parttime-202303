const { validators: { validateId, validateUrl, validateText } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, image, text, callback) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

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