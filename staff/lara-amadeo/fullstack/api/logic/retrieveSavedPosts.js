const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function retrieveSavedPosts(userId){

        const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.find().toArray()])
        .then(([user, posts]) => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return posts.filter(post => user.savedPosts.includes(post._id.toString()))
        })
}