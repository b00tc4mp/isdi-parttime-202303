const { 
    validators: { validateId },
    errors: { ExistenceError }
 } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')


module.exports = function retrievePosts(userId){
    validateId (userId, 'user id')
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError (`User with id ${userId} not found`)

            return Promise.all([users.find().toArray(), posts.find().toArray()])
                .then(([users, posts]) => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        const _user = users.find(user => user._id.toString() === post.author.toString())

                        post.author = {
                            id: _user._id.toString(),
                            username: _user.username,
                            avatar: _user.avatar
                        }

                        post.favs = user.favs.some(id => id.toString() === post.id)

                        post.date = new Date(post.date)
                    })
                    return posts.reverse()
                })
        })
}