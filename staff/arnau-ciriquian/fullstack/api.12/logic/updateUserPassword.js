const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateNewPassword, validatePasswordConfirm, validateId } } = require('com')

module.exports = (userId, password, newPassword, newPasswordConfirmation) => {
    validateId(userId)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    if (newPassword === password) throw new Error('new password is the same as old password')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (password !== user.password) throw new Error('password is not correct')

            return users.updateOne({ '_id': new ObjectId(userId) }, { $set: { password: newPassword } })
        })
}