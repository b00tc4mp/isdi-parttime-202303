const { validators: { validateId, validatePassword } } = require('com')

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            if (user.password !== password)  throw new Error('Error the pasword is invalid', {cause: "password"})

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { password: newPassword }})

        })
}