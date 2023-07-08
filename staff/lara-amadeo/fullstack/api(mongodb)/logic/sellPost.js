const { errors: { ExistanceError } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function sellPost(userId, postId, newPrice) {

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { price: newPrice } })
        })
}