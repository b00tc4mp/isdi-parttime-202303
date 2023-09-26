const { 
    validators: { validateId },
    errors: { ExistenceError }
 } = require('com')
const { ObjectId } = require('mongodb')
const context = require('../context')

module.exports = function toggleLikePost(userId, postId){
    validateId(userId, 'user id')

    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)

            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)
            
            const index = post.likes.findIndex((id) => id.toString() === userId)

            if (index < 0) {
                return posts.updateOne(
                    { _id: new ObjectId(postId) },
                    { $push: { likes: new ObjectId(userId) } }
                )

            } else {
                post.likes.splice(index, 1)
            }

            return posts.updateOne(
                { _id: new ObjectId(postId) },
                { $set: { likes: post.likes } }
            )

        })
}
