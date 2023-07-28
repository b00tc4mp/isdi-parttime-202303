const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validateText, validatePassword, validateCallback } } = require('com')

/**
 * 
 * @param {string*} userId 
 * @param {string*} image 
 * @param {string*} title 
 * @param {string*} text 
 * @param {string*} location 
 * @returns {Promise<Object>} returns a promise object contains de new post 
 * 
 * @throws {TypeError} on non-string id, image, title and text (sync)
 * @throws {ContentError} on empty id, image, title or text  (sync)
 * @throws {FormatError} wrong format on image (sync)
 */

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