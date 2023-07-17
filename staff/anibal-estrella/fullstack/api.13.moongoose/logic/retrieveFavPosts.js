const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')
    //one step version
    return Promise.all([
        User.findById(userId).lean()
    ])
        .then(([user, posts]) => {
            if (!user) throw new ExistenceError('user not found')

            posts.forEach(post => {
                post.likes = post.likes.includes(user.id)

                const _user = users.find(user => user.id === post.author)

                //sanityze
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
}

