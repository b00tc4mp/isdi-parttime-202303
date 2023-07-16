const { User, Post } = require('../../data/models')
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized posts 
  * 
 * @throws {TypeError} on non-string userId (sync)
 * @throws {ContentError} on empty userId (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */
module.exports = userId => {
    validateId(userId)
    return User.findById(userId).lean()
        .then(user => {
            if (!user) new ExistenceError(`User with id ${userId} not found`)

            return Post.find().sort('-date').populate('author', '-password -favs -__v').lean()
                .then(posts => {
                    posts.forEach(post => {
                        const postAuthorId = post.author._id?.toString()

                        post.id = post._id.toString()
                        delete post._id

                        post.fav = user.favs?.some(fav => fav.toString() === post.id)

                        if (postAuthorId === userId) {
                            post.author.id = post.author._id.toString()

                            delete post.author._id
                        } else {
                            delete post.author._id
                        }
                    })

                    return posts
                })

        })
}