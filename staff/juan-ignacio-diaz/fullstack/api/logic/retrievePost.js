const { 
    validators: { validateId },
    errors: { ExistenceError, AuthError } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const { users , posts } = context

    const promises = []

    promises.push(users.findOne({ _id: new ObjectId(userId) }))
    promises.push(posts.findOne({ _id: new ObjectId(postId) }))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('user not found')

            if (user._id.toString() !== post.author)
                throw new AuthError(`Post doesn't belong to this user`)

            post.date = new Date(post.date)
            post.dateLastModified = new Date(post.dateLastModified)
           
            return post
        })
}
