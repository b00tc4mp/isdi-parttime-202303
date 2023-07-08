const { ObjectId } = require('mongodb')
const context = require('./context')
const { errors: { ExistanceError } } = require('com')

module.exports = function retrieveSavedPosts(userId) {

    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.find().toArray()])
        .then(([user, posts]) => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)


            return posts.filter(post => user.savedPosts.some(id => id.toString() === post._id.toString()))
        })
}