const { validators: { validateId, validateUrl, validateText } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, image, text) => {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const { posts } = context
    
    return posts.insertOne({ author: new ObjectId(userId), image, text, likes: [], date: (new Date).toLocaleString('en-UK'), visibility: true, fav: false })
}