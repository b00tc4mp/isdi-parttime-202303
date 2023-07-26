const { 
    validators: { validateId, validatePassword },
    errors: { ExistenceError, ContentError, AuthError}
} = require('com')
const { User } = require('../../data/models')


module.exports = (userId, password, newPassword, newPasswordConfirm) => {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    if (newPassword === password) throw new ContentError ('new password equals old password ')
    validatePassword(newPasswordConfirm, 'new password confirm')
    if (newPassword !== newPasswordConfirm) throw new ContentError ('password confirmation mismatch')

    return User.findById(userId)
        .then(user => {
            if(!user) {
                throw new ExistenceError ('User not found') }
            
            if(user.password !== password) {
                throw new AuthError ('wrong password')
            }

            return User.updateOne({ _id: userId }, {$set: {password : newPassword}})
        })

        .then(() => { })
}