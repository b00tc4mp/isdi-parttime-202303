const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        // Post.find().sort('-date').populate('author', '-password -favs -__v -paymentMethods').lean()
        Post.find().sort('-date').populate('author', 'name avatar').populate('comments.author', 'name avatar').lean()
    ])
        .then(([user, posts]) => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                delete post.__v

                post.fav = user.favs.some(fav => fav.toString() === post.id)

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                post.comments.forEach(comment => {
                    comment.id = comment._id.toString()
                    delete comment._id

                    if (comment.author._id) {
                        comment.author.id = comment.author._id.toString()
                        delete comment.author._id
                    }
                })
            })

            return posts
        })
}