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
                            const filterPosts = posts.filter(post => post.likes?.includes(userId))

                            filterPosts.forEach(post => {
                                const user = users.find(_user => _user._id.toString() === userId)
                                const postsFound = post.likes?.includes(user._id.toString())
                                if (postsFound) {
                                    post.date = new Date(post.date)

                                    const postAuthor = users.find(user => user._id.toString() === post.author.toString())

                                    post.author = {
                                        id: postAuthor._id.toString(),
                                        name: postAuthor.name,
                                        image: postAuthor.image
                                    }
                                }

                            })
                            return filterPosts
                        })
                })
        })
}

// add saved posts to db
// db.posts.updateOne({ _id: new ObjectId("649374bc82c6d24eb1c7f958") }, { $set: { likes: ["6493720d82c6d24eb1c7f954", "6493722282c6d24eb1c7f955"] }     })
// db.posts.updateOne({ _id: new ObjectId("6493731782c6d24eb1c7f957") }, { $set: { likes: ["6493720d82c6d24eb1c7f954", "6493722282c6d24eb1c7f955"] }     })