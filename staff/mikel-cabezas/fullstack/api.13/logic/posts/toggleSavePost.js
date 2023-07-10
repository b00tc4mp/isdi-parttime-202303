const context = require('../context')
const { ObjectId } = require('mongodb')
const { validators: { validateToken, validatePostId } } = require('com')
module.exports = (userId, postId) => {
    validateToken(userId)
    validatePostId(postId)

    const { users } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) throw new Error('post not found')
            const indexFavPost = user.favs?.indexOf(postId)
            if (indexFavPost < 0) {
                user.favs.push(postId)
                return users.updateOne(_user, {
                    $set: {
                        favs: user.favs
                    }
                })
            } else {
                user.favs.splice(indexFavPost, 1)
                return users.updateOne(_user, {
                    $set: {
                        favs: user.favs
                    }
                })
            }
        })
}