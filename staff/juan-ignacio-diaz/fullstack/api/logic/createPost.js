const { validators: { validateId, validateUrl, validateText } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, image, text, callback) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text, 'text')

    const { users , posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
        if (!user) throw new Error('user not found')

        return posts.insertOne({
                author: userId,
                image,
                text,
                date: new Date,
                dateLastModified: '',
                likes: [],
                lock: false,
                price: 0
            })
    })
}