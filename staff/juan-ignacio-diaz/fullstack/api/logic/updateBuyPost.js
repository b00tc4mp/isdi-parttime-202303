const { 
    validators: { validateId },
    errors: { ExistenceError }
 } = require('com')

 const { User, Post } = require('../data/models')

module.exports = (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    return (async () => { 
        const [user, post] = await Promise.all([User.findById(userId), Post.findById(postId)])

        if (!user) throw new ExistenceError('user not found')

        if (!post) throw new ExistenceError('post not found')

        await Post.findByIdAndUpdate(postId, { $set: { author: userId, price: 0 }})
    })()
}