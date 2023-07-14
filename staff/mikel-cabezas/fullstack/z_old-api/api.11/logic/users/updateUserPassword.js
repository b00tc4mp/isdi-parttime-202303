const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validatePassword, validateNewPassword } } = require('com')

module.exports = (userId, currentPassword, newPassword, repeatPassword) => {
    validateUserId(userId)
    validatePassword(currentPassword)
    validatePassword(newPassword)
    validatePassword(repeatPassword)
    validateNewPassword(currentPassword, newPassword, repeatPassword)
    const { users } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) throw new Error('user not found')

            return users.updateOne(_user, { $set: { password: newPassword } })
        })
}