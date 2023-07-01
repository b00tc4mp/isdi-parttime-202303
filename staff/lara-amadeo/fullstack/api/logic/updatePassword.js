const { validators: { validatePassword }, errors: { ExistanceError, ContentError } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function updatePassword(userId, password, newPassword) {
    validatePassword(newPassword)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
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

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { password: newPassword } })
        })
}