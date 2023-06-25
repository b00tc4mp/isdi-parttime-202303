const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function retrieveSavedPosts(userId){

        const { users, posts } = context

        return users.findOne({_id: new ObjectId(userId)})
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return posts.find().toArray()
            .then(_posts => {
                return _posts.filter(post => user.savedPosts.includes(post._id.toString()))
            })
        })
}