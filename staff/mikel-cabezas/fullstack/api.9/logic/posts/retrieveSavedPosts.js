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
                            const favPosts = []

                            posts.forEach(post => {
                                debugger
                                const user = users.find(_user => _user._id.toString() === userId)
                                const postsFound = user.favs?.includes(post._id.toString())
                                if (postsFound) {
                                    post.favs = user.favs.includes(post._id.toString())
                                    post.date = new Date(post.date)

                                    const postAuthor = users.find(user => user._id.toString() === post.author.toString())

                                    post.author = {
                                        id: postAuthor._id.toString(),
                                        name: postAuthor.name,
                                        image: postAuthor.image
                                    }
                                    favPosts.push(post)
                                }

                            })
                            return favPosts
                        })
                })
        })
}

// add saved posts to db
// db.users.updateOne({ _id: new ObjectId("64948003bf12f13f6b1cb852") }, { $set: { favs: ["649727c3250633946b2b02e5"] }     })