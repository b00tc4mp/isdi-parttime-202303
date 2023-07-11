const { validators: { validateText }, errors: { ContentError, ExistanceError } } = require('com')
const { User } = require('../data/models')

module.exports = function updateAvatar(userId, url) {

    validateText(userId)

    if (!url) {
        throw new ContentError('Image not uploaded correctly')
    }

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${user._id.toString()} not found`)

            return User.updateOne({ _id: userId }, { avatar: url })
        })
}