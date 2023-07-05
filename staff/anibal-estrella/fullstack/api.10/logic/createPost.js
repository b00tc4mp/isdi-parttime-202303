require('dotenv').config()
const { validators: { validateText, validateUrl, validateId, validateCallback } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

/**
 * Creates a new post and updates the posts DB
 * @param {*} userId the user's ID
 * @param {*} text  the Post's text
 * @param {*} image the Post's image
 */

module.exports = (userId, text, image, callback) => {
    validateId(userId, 'user id')
    validateText(text, 'Post text')
    validateUrl(image, 'Image URL')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

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


