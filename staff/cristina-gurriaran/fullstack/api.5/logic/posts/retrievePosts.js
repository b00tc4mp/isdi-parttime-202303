const { validators: { validateId } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrievePosts(userId){
    validateId (userId, 'user id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId)})
        .then(user => {
            if (!user) new Error(`User not found`)

            return posts.find().toArray()

    })
}