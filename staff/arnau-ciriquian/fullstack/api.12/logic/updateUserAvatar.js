const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateUrl, validateId } } = require('com')

module.exports = (userId, avatar) => {
    validateId(userId)
    validateUrl(avatar, 'avatar url')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return users.updateOne({ '_id': new ObjectId(userId) }, { $set: { avatar: avatar } })
        })
}