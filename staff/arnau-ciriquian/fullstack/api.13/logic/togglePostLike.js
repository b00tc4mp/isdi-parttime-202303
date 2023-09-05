const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId } } = require('com')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error('post not found')

                    const likes = post.likes

                    const targetObjectId = new ObjectId(userId)
                    const index = likes.findIndex((objectId) => objectId.equals(targetObjectId))

                    if (index < 0)
                        return posts.updateOne({ '_id': new ObjectId(postId) }, { $push: { 'likes': new ObjectId(userId) } })
                    else
                        return posts.updateOne({ '_id': new ObjectId(postId) }, { $pull: { 'likes': new ObjectId(userId) } })
                })
        })
}