const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Post.find().sort('-date').populate('author', '-password -favs -__v').lean()
                .then(posts => {
                    posts.forEach(post => {
                        post.fav = user.favs.some(fav => fav.toString() === post.id)

                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }
                    })

                    return posts
                })
        })
}