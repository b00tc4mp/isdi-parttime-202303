const context = require('../context')
const { ObjectId } = require('mongodb')
const { validators: { validateUserId } } = require('com')
module.exports = userId => {
    validateUserId(userId)

    const { users, posts } = context
    const _user = { _id: new ObjectId(userId) }


    return Promise.all([users.find().toArray(), posts.find().toArray()])
        .then(([users, posts]) => {
            const user = users.find(user => user._id.toString() === userId)

            if (!user) new Error(`User with id ${userId} not found`)

            posts.forEach(post => {
                post.id = post._id.toString()

                delete post._id

                const author = users.find(user => user._id.toString() === post.author.toString())

                const { _id, name, avatar } = author

                post.author = {
                    id: _id.toString(),
                    name,
                    avatar
                }

                post.fav = users.favs?.some(fav => fav.toString() === post === post.id)
            })

            return posts
        })
}