const context = require('./context')
const { validators: { validateId } } = require('com')
const { ObjectId } = require('mongodb')

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
        
                    return post
                })
        })
}
