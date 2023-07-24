const { 
    validators: { validateId, validatePassword },
    errors: { ExistenceError, InvalidDataError }  
} = require('com')

const { User } = require('../data/models')

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new InvalidDataError("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new InvalidDataError("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')

        if (user.password !== password)  throw new InvalidDataError('Error the pasword is invalid', {cause: "password"})

        await User.findByIdAndUpdate(userId, { $set: { password: newPassword }})
    })()
}