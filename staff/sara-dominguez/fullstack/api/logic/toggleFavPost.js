require('dotenv').config()
const context = require('./context')
const { validators: { validateId } } = require('com')

module.exports = function toggleFavPost(userId, postId) {
    validateId(userId)
    validateId(postId)


    const { users, posts } = context

    return Promise.all([users.find().toArray(), posts.find().toArray])

        .then(([users, posts]) => {
            const user = users.findOne({ _id: new ObjectId(userId) })

            if (!user) throw new Error('user not found')

            const post = posts.findOne({ _id: new ObjectId(postId) })

            if (!post) throw new Error('user not found')


            const index = user.favs.indexOf(postId)
            if (index < 0) {
                user.favs.push(postId)
            } else {
                user.favs.splice(index, 1)

                if (!user.favs.length) delete user.fav
            }

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { favs: user.favs } })
        })





}


