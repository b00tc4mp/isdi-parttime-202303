const { 
    validators: { validateId, validateNumber },
    errors: { ExistenceError, AuthError } 
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId, price) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateNumber(price)

    return (async () => { 
        const [user, post] = await Promise.all([User.findById(userId), Post.findById(postId)])
        if (!user) throw new ExistenceError('user not found')

        if (!post) throw new ExistenceError('post not found')

        if (user._id.toString() !== post.author.toString())
            throw new AuthError(`Post doesn't belong to this user`)

        return Post.findByIdAndUpdate(postId, { $set: { price: price }})
    })()      
}