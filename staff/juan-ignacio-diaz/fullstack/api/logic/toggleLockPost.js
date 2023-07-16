const { 
    validators: { validateId },
    errors: { ExistenceError, AuthError } 
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const promises = []

    promises.push(User.findById(userId))
    promises.push(Post.findById(postId))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('post not found')

            if (user._id.toString() !== post.author.toString())
                throw new AuthError(`Post doesn't belong to this user`)

            const lock = post.lock? false : true

            return Post.findByIdAndUpdate(postId, { $set: { lock: lock } })
                .then(() => { })   
        })
}



