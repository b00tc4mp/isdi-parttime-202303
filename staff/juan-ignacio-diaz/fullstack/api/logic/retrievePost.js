const { 
    validators: { validateId },
    errors: { ExistenceError, AuthError } } = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return (async () => {
        const [user, post] = await Promise.all([User.findById(userId), Post.findById(postId, '-_id author image text price')])
    
        if (!user) throw new ExistenceError('user not found')

        if (!post) throw new ExistenceError('post not found')

        if (userId !== post.author.toString())
            throw new AuthError(`Post doesn't belong to this user`)
        
        delete post.author  
        
        return post
    })()
}
