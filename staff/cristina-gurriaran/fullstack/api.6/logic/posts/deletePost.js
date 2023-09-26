const { 
    validators: { validateId },
    errors: { ExistenceError, PermitError },
 } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')


module.exports = function deletePost(userId, postId){
    validateId(userId, 'User ID')
    validateId(postId, 'Post ID')

    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId)}), posts.findOne({ _id: new ObjectId(postId)})])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)
            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)
            if (userId !== post.author.toString()) throw new PermitError(`Post with id ${postId} does not belong to user with id ${userId} `)
            
            return posts.deleteOne({ _id: new ObjectId(postId)})
        })
}