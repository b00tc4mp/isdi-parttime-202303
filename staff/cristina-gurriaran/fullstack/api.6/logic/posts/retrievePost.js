const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrievePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const { users, posts } = context

    return Promise.all([
        users.findOne({ _id: new ObjectId(userId)}),
        posts.findOne({ _id: new ObjectId(postId)})
    ])
    .then(([user , post]) => {
        if (!user) throw new ExistenceError(`User with id ${userId} not found`)
        if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

        return post
    })

}
