const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId } } = require('com')

const { User, Post } = require('../data/models.js')

/**
 * Creates a new post and updates the posts DB
 * @param {string} userId the user's ID
 * @param {string} image the Post's image
 * @param {string} text  the Post's text
 */

module.exports = (userId, image, text) => {
    validateId(userId, 'user id')
    validateUrl(image, 'Image URL')
    validateText(text, 'Post text')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} does not exist`)

            return Post.create({
                author: userId,
                image,
                text
            })
        })
        .then(() => { })
}


