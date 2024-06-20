const { validators: { validateId, validateUrl, validateText } } = require('com')

const context = require('../context')


module.exports = function createPost(userId, image, location, title, text){
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    const { posts } = context

    return posts.insertOne({
        author: userId,
        image,
        location,
        title,
        text,
        date: new Date(),
        likes: []
    })
}
