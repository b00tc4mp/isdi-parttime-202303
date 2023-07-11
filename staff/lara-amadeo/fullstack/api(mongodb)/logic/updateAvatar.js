const { validators: { validateText }, errors: { ContentError, ExistanceError } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function updateAvatar(userId, url) {

    validateText(userId)

    if (!url) {
        throw new ContentError('Image not uploaded correctly')
    }

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${user._id.toString()} not found`)
            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: url } })
        })
}