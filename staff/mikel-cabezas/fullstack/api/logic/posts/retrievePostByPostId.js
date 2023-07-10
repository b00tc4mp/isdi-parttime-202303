const context = require('../context')
const { ObjectId } = require('mongodb')
const {
    validators: { validateUserId, validatePostId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {*} userId 
 * @param {*} postId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized post 
 * 
 * @throws {TypeError} on non-string userId and/or postId (sync)
 * @throws {ContentError} on empty userId and/or postId (sync) 
 * 
 * @throws {ExistenceError} on user not found (async)
 * */
module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) new ExistenceError(`User with id ${userId} not found`)
            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(posts => {
                            return posts.find(post => post._id.toString() === postId)
                        })
                })
        })
}