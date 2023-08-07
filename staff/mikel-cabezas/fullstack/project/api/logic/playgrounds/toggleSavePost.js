const { User, Post } = require('../../data/models')
const {
    validators: { validateUserId, validatePostId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {*} userId 
 * @param {*} postId 
 * @returns {Promise<Object>} returns a promise object contains de user with saves updated 
 * 
 * @throws {TypeError} on non-string userId, postId (sync)
 * @throws {ContentError} on empty userId, postId (sync)

 * @throws {ExistenceError} on post not found (async)

 */
module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('post not found')

            const indexFavPost = user.favs?.indexOf(postId)

            if (indexFavPost < 0) {
                user.favs.push(postId)
                return user.updateOne({
                    favs: user.favs
                })
            } else {
                user.favs.splice(indexFavPost, 1)
                return user.updateOne({
                    favs: user.favs
                })
            }
        })
}