const {
    errors: { ExistenceError },
    validators: { validateId } } = require('com')

const { User, Post } = require('../data/models.js')

/**
 * 
 * @param {*} userId the user's ID
 * @param {*} postId the post's ID
 * @param {*} promise 
 */

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([
        User.findById(userId).lean(),

        Post.findById(postId, '-__v').lean(),
    ])

        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            const index = user.favs.findIndex(id => id.toString() === postId)

            if (index < 0)
                return User.updateOne(
                    { _id: userId },
                    { $push: { favs: postId } })


            return User.updateOne(
                { _id: userId }, { $pull: { favs: postId } })

        })
        .then(() => { })
}