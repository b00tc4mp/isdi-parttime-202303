
const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models')


module.exports = function toggleFavPost(userId, postId) {
    validateId(userId)
    validateId(postId)

    return Promise.all([User.findById({ _id: userId }), Post.findById({ _id: postId })])

        .then(([user, post]) => {
            if (!user) throw new TypeError('user not found')
            if (!post) throw new TypeError('user not found')

            debugger
            const index = user.favs.findIndex(favs => user.favs.toString() === post.id)
            if (index < 0) {
                return User.updateOne({ _id: user.id }, { $push: { favs: post.id } })

            } else {
                user.favs.splice(user.favs.findIndex(favs => user.favs.toString() === post.id), 1)

                return User.updateOne({ _id: userId }, { $set: { favs: user.favs } })
            }
        })
}


