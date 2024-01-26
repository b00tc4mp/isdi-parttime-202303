const { validators: { validateId, validateUserAvatar } } = require('com')

const { User } = require('../data/models')
const { ObjectId } = require('mongodb')

module.exports = function updateUserAvatar(userId, newAvatar) {
    validateId(userId)
    validateUserAvatar(newAvatar)



    // return User.findById(userId)
    //     .then(user => {
    //         if (!user) throw new TypeError('user not found')

    //         user.avatar = newAvatar

    //         return User.updateOne({ _id: user.id }, { $set: { avatar: user.avatar } })

    //     })

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new TypeError('user not found')

        user.avatar = newAvatar

        return User.updateOne({ _id: user.id }, { $set: { avatar: user.avatar } })
    })()
}
