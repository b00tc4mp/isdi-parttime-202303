require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword } } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')


module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirm){
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    if(newPassword === password) throw new Error ('new password equals old password ')
    validatePassword(newPasswordConfirm, 'new password confirm')
    if(newPassword !== newPasswordConfirm) throw new Error ('password confirmation mismatch')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId )})
        .then(user => {
            if(!user) {
                throw new Error ('User not found') }
            
            if(user.password !== password) {
                throw new Error ('wrong password')
            }

            return users.updateOne({ _id: new ObjectId(userId)}, {$set: {password : newPassword}})
        })
}