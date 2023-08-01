const { User, Post } = require('../../data/models')
const {
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @param {string} postId 
 * @param {string} title 
 * @param {string} text 
 * @param {string} image 
 * @param {string} visibility 
 * @returns {Promise<Object>} returns a promise object contains de edited post 
 * 
 * @throws {TypeError} on non-string userId, postId, image, title and text (sync)
 * @throws {ContentError} on empty userId, postId, image, title and text (sync)
 * @throws {FormatError} wrong format on image (sync)
 * 
 * @throws {ExistenceError} on post not found (async)
 */
module.exports = (userId, postId, title, text, image, visibility) => {
    validateId(userId)
    validateId(postId)
    validateText(title)
    validateText(text)


    return Post.findById(postId)
        .then(post => {
            if (!post) throw new ExistenceError('post not found')

            return post.updateOne({
                image: image,
                title: title,
                text: text,
                lastModify: new Date(),
                visibility: visibility ? visibility : post.visibility,
            })
        })
}

