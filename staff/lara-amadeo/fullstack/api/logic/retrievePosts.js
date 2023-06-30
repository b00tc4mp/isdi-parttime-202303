const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function retrievePosts(userId) {

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return Promise.all([users.find().toArray(), posts.find().toArray()])
                .then(([users, posts]) => {
                    posts.forEach(post => {
                        post.favs = user.savedPosts.some(id => id.toString() === post._id.toString())
                        post.date = new Date(post.date)

                        const _user = users.find(user => user._id.toString() === post.author.toString())

                        post.author = {
                            id: _user._id.toString(),
                            username: _user.username,
                            avatar: _user.avatar
                        }
                    })
                    return posts
                })
        })
}
