const context = require('./context')
const { validators: { validateId } } = require('com')
const { ObjectId } = require('mongodb')


module.exports = function toggleFavPost(userId, postId) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])

        .then(([user, post]) => {
            if (!user) throw new TypeError('user not found')
            if (!post) throw new TypeError('user not found')

            const index = user.favs.findIndex(id => id.toString() === postId)
            if (index < 0) {
                return users.updateOne({ _id: new ObjectId(userId) }, { $push: { favs: new ObjectId(postId) } })

            } else {
                user.favs.splice(user.favs.findIndex(fav => fav === new ObjectId(postId)), 1)

                return users.updateOne({ _id: new ObjectId(userId) }, { $set: { favs: user.favs } })
            }

        })
}


