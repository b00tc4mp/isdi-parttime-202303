const { 
    validators: { validateId },
    errors: { ExistenceError }
 } = require('com')

 const { User, Post } = require('../data/models')

module.exports = (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const { users , posts } = context

    const promises = []

    promises.push(User.findById(userId))
    promises.push(Post.findById(postId))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('post not found')

            return Post.findByIdAndUpdate(postId, { $set: { author: userId, price: 0 }})
                .then(() => { })  
        }) 
}