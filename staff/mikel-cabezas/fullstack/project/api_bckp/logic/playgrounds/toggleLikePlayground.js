const { User, Playground } = require('../../data/models')
const {
    validators: { validateUserId, validatePostId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {*} userId 
 * @param {*} postId 
 * @returns {Promise<Object>} returns a promise object contains de post with likes updated 
 * 
 * @throws {TypeError} on non-string userId, postId (sync)
 * @throws {ContentError} on empty userId, postId (sync)
 * 
 * @throws {ExistenceError} on post not found (async)
 * 
 */
module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)


    return Playground.findById(postId)
        .then(playground => {
            if (!playground) throw new ExistenceError('post not found')
            const indexLikedPost = playground.likes?.indexOf(userId)
            if (indexLikedPost < 0) {
                playground.likes.push(userId)

                return playground.updateOne({
                    likes: playground.likes
                })
            } else {
                playground.likes.splice(indexLikedPost, 1)
                return playground.updateOne({
                    likes: playground.likes
                })
            }
        })
        .then(() => {
            return Playground.findById(postId).then(playground => playground)
        })
}

// db.posts.updateOne({ _id: ObjectId("649727c3250633946b2b02e5") }, { $set: { likes: [] }})