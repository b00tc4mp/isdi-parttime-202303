const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function retrievePost(userId, postId) {
        const { users, posts } = context
        
        return users.findOne({ _id: new ObjectId(userId) })
            .then(user => {
                if (!user) throw new Error(`User with id ${userId} not found`)

                return posts.findOne({_id: new ObjectId(postId)})
            })
}