const { validators: { validateId, validateUrl } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, avatar) => {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar')

    const { users } = context

    return users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: avatar }})
}