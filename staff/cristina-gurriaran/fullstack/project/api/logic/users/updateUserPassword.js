const { 
    validators: { validatePassword },
    errors: { ExistenceError, ContentError, AuthError}
} = require('com')
const { User } = require('../../data/models')


module.exports = (userId, password, newPassword, newPasswordConfirm) => {
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    
    if (newPassword === password) throw new ContentError ('new password equals old password')
    if (newPassword !== newPasswordConfirm) throw new ContentError ('password confirmation mismatch')

    return (async() => {
        const user = await User.findById(userId)

        if (!user) 
            throw new ExistenceError('user not found')
        
        if (user.password !== password) 
            throw new AuthError('wrong password')

        return User.updateOne({ _id: userId }, { $set: { password: newPassword } })

    })()
}