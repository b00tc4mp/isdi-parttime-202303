const context = require('../context')
const { ObjectId } = require('mongodb')
const { validators: { validateUserId, validatePostId } } = require('com')
module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) new Error(`User with id ${userId} not found`)
            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(posts => {
                            return posts.find(post => post._id.toString() === postId)
                        })
                })
        })
}