const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')


module.exports = function retrievePosts(userId) {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        // Post.find().sort('-date').populate('author', '-password -favs -__v').lean()

        Post.find().sort('-date').populate('author', 'name avatar').populate('comments.author', 'name.avatar').lean()
    ])
        .then(([user, posts]) => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                post.fav = user.favs.some(fav => fav.toString() === post.id)

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                    delete post.__v
                }
                post.comments.forEach(comment => {
                    if (comment.author._id) {
                        delete comment.author._id
                        delete comment.__v
                    }
                })
            })

            return posts
        })
}