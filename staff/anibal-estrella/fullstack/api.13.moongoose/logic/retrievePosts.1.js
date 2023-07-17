const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')

    return User.findById(userId)
        .then((user) => {
            if (!user) throw new ExistenceError('user not found')

            // ask mongod to populate and filter the query object properties to exclude to the autrhor 
            return Post.find().sort('-date').populate('author', '-__v -password -favs').lean()
                .then(posts => {
                    posts.forEach(post => {
                        //add the id converted to string (all _id are objects and should be converted to strings)
                        post.id = post._id.toString()

                        //sanityze time
                        delete post._id
                        delete post.__v

                        //compare the ids now strings
                        post.fav = user.favs.some(fav => fav.toString() === post.id) //true/false if post is fav

                        //avoid error if the user reference to the post.author._id object is already deleted
                        debugger
                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }
                    })

                    return posts
                })
        })
}