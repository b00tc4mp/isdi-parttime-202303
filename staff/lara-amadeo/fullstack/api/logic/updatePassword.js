const { validators: { validatePassword }, errors: { ExistanceError, ContentError } } = require('com')
const { User } = require('../data/models')

module.exports = function updatePassword(userId, password, newPassword) {
    validatePassword(newPassword)

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new ExistanceError(`User with id ${userId} not found`)
            }

            if (user.password !== password) {
                throw new ContentError(`Invalid current password`)
            }

            if (password === newPassword) {
                throw new ContentError(`New password cannot be the same as current password`)
            }

            return User.updateOne({ _id: userId }, { password: newPassword })
        })
}