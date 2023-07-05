const { 
    validators: { validateId, validatePassword },
    errors: { ExistenceError, InvalidDataError }  
} = require('com')

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new InvalidDataError("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new InvalidDataError("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (user.password !== password)  throw new InvalidDataError('Error the pasword is invalid', {cause: "password"})

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { password: newPassword }})

        })
}