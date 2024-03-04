require('dotenv').config()
const {
    errors: { ExistenceError },
    validators: { validateText, validateUrl, validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

/**
 * Creates a new post and updates the posts DB
 * @param {string} userId the user's ID
 * @param {string} text  the Post's text
 * @param {string} image the Post's image
 */

module.exports = (userId, text, image) => {
    validateId(userId, 'user id')
    validateText(text, 'Post text')
    validateUrl(image, 'Image URL')
    debugger
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} does not exist`)

            return posts.insertOne({
                author: user._id,
                image,
                text,
                date: new Date,
                likes: []
            })
        })
}


