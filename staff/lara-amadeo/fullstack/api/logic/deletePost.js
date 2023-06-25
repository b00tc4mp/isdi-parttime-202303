const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function deletePost(userId, postId) {
    const { users, posts } = context

    return users.findOne({_id: new ObjectId(userId)})
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return posts.deleteOne({_id: new ObjectId(postId)})
        })
}