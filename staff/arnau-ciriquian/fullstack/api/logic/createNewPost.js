const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Creates a new post by the logged user
 * 
 * @param {string} userId 
 * @param {string} image 
 * @param {string} text 
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string image or text
 * @throws {ContentError} On empty image or text
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId, image, text) => {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user not found`)

            return Post.create({
                author: userId,
                image,
                text
            })
        })
}