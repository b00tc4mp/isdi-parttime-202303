const { 
    validators: { validateId, validatePassword },
    errors: { ExistenceError, ContentError, AuthError}
} = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')


module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirm){
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    if (newPassword === password) throw new ContentError ('new password equals old password ')
    validatePassword(newPasswordConfirm, 'new password confirm')
    if (newPassword !== newPasswordConfirm) throw new ContentError ('password confirmation mismatch')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId )})
        .then(user => {
            if(!user) {
                throw new ExistenceError ('User not found') }
            
            if(user.password !== password) {
                throw new AuthError ('wrong password')
            }

            return users.updateOne({ _id: new ObjectId(userId)}, {$set: {password : newPassword}})
        })
}