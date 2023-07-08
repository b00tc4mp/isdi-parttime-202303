const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function retrieveSavedPosts(userId) {

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return Post.find({ _id: { $in: user.savedPosts } }).lean()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id

                    })

                    return posts
                })
        })
}