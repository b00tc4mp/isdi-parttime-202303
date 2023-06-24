const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validateText, validatePassword, validateCallback } } = require('com')
module.exports = (userId, image, title, text, location) => {
    validateUserId(userId)
    validateText(title)
    validateText(text)

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }

    // const lastPostPosition = posts.countDocuments()
    // console.log(lastPostPosition)
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