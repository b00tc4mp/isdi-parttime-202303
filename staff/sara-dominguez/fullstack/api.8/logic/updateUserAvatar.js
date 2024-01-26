const { validators: { validateId, validateUserAvatar } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function updateUserAvatar(userId, newAvatar) {
    validateId(userId)
    validateUserAvatar(newAvatar)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: newAvatar } })

        })
}
