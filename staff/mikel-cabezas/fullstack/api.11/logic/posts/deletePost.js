const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validatePostId } } = require('com')

module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)
    const { posts } = context

    return posts.deleteMany({ _id: new ObjectId(postId) })

}