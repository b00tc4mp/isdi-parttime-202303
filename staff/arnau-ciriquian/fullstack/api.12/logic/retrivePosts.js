const { ObjectId } = require('mongodb')
const context = require('./context')
const { validators: { validateId } } = require('com')

module.exports = (userId) => {
    validateId(userId, 'user id')
    
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return posts.find().toArray()
        })
}