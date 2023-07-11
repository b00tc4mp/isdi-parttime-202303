const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function retrievePosts(userId) {

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return Post.find().sort('-date').populate('author', '-password -likedPosts -savedPosts').lean()
                .then(posts => {
                    posts.forEach(post => {
                        post.favs = user.savedPosts.some(id => id.toString() === post._id.toString())

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

