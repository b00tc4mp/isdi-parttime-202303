const {
    validators: { validateId },
    errors: { ExistenceError, AuthError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().sort('-date').populate('author', 'name avatar').lean()
    ])
        .then(([user, posts]) => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                delete post.__v

                post.fav = user.favs.some(fav => fav.toString() === post.id)

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }
            })

            return posts
        })
}