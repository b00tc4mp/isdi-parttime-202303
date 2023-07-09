const context = require('../context')
const { ObjectId } = require('mongodb')
const { validators: { validateUserId } } = require('com')
module.exports = userId => {
    validateUserId(userId)

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) new Error(`User with id ${userId} not found`)

            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(posts => {
                            posts.forEach(post => {
                                post.favs = user.savedPosts?.includes(post._id.toString())
                                post.date = new Date(post.date)

                                const postAuthor = users.find(user => user._id.toString() === post.author.toString())

                                post.author = {
                                    id: postAuthor._id.toString(),
                                    name: postAuthor.name,
                                    image: postAuthor.image
                                }
                            })
                            return posts
                        })
                })
        })
}