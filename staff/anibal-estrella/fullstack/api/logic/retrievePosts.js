const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')
    //one step version
    return Promise.all([
        User.findById(userId).lean(),
        // populate posts sorted by date, and from de embeded objects only the AUTHOR's NAMEand AVATAR, then every posts comments only the avatar and name
        Post.find().sort('-date').populate('author', 'name avatar').populate('comments.author', 'name, avatar').lean()
    ])
        .then(([user, posts]) => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            //sanityze
            posts.forEach(post => {
                //convert the id to string (all _id are objects and should be converted to strings)
                post.id = post._id.toString()
                delete post._id

                delete post.__v

                //compare the ids now strings
                post.fav = user.favs.some(fav => fav.toString() === post.id) //true/false if post is fav

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                // sanityze each comment
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