const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validatePostId } } = require('com')

/**
 * 
 * @param {string*} userId 
 * @param {string*} postId 
 * @returns {Promise<Object>} returns a promise object contains de deleted post 
 * 
 * @throws {TypeError} on non-string userId and/or postId (sync)
 * @throws {ContentError} on empty userId and/or postId (sync)
 */
module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)
    const { posts } = context

    return posts.deleteMany({ _id: new ObjectId(postId) })

}