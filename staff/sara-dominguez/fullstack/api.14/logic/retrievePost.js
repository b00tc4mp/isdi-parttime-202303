require('dotenv').config()
const context = require('./context')
// const { validateId } = require('com')
const { ObjectId } = require('mongodb')
const { validators: { validateId } } = require('com')

module.exports = function retrievePost(userId, postId,) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new TypeError('user not found')

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new TypeError('post not found')

                    return post
                })
        })
}