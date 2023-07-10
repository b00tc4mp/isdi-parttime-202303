const { ObjectId } = require('mongodb')
const context = require('../context')
const {
    validators: { validateUserId, validateText, validatePostId },
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
    validateUserId(userId)
    validatePostId(postId)
    validateText(title)
    validateText(text)

    const { posts } = context
    const _post = { _id: new ObjectId(postId) }
    let visibilityStatus
    if (visibility) {
        visibilityStatus = 'public'
    } else {
        visibilityStatus = 'private'
    }

    return posts.findOne(_post)
        .then(post => {
            if (!post) throw new ExistenceError('post not found')
            return posts.updateOne(_post, {
                $set: {
                    image: image,
                    title: title,
                    text: text,
                    date: new Date(post.date),
                    lastModify: new Date(),
                    comments: post.comments,
                    likes: post.likes,
                    visibility: visibilityStatus,
                    location: post.location
                }
            })
        })
}

