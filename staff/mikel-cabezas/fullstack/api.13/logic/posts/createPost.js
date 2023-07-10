const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validateText, validatePassword, validateCallback } } = require('com')
module.exports = (userId, image, title, text, location) => {
    validateUserId(userId)
    validateText(title)
    validateText(text)

    const { posts } = context

    return posts.insertOne({
        author: userId,
        image: image,
        title: title,
        text: text,
        date: new Date(),
        comments: [],
        likes: [],
        visibility: 'public',
        location: ''
    })
}