const { validators: { validateId, validateUrl, validateText } } = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, image, text) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Post.create({
                author: userId,
                image,
                text
            })
        })
        .then(() => { })
}