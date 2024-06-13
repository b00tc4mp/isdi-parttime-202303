const {
    validators: { validateId },
    errors: { ExistenceError, AuthError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Add or remove a post to a user's favorites array
 * 
 * @param {string} userId User id
 * @param {string} postId Post id
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ExistenceError} On non-existing user or post
 */
module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Post.findById(postId)
                .then(post => {
                    if (!post) throw new ExistenceError('post not found')

                    const favs = user.favs

                    const index = favs.findIndex((objectId) => objectId.equals(postId))

                    if (index < 0) {
                        favs.push(postId)

                        return User.updateOne({ '_id': userId }, { 'favs': favs })
                    }
                    else {
                        favs.splice(index, 1)

                        return User.updateOne({ '_id': userId }, { 'favs': favs })
                    }
                })
        })
}
