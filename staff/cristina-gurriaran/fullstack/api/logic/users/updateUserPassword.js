const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword, validateCallback } } = require('com')

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback){
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    if(newPassword === password) throw new Error ('new password equals old password ')
    validatePassword(newPasswordConfirm, 'new password confirm')
    if(newPassword !== newPasswordConfirm) throw new Error ('password confirmation mismatch')
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => userId === user.id)

        if (!user){
            callback(new Error ('User not found'))
            return
        }

        if(password !== user.password){ 
            callback(new Error ('wrong password'))
            return
        }
        
        user.password = newPassword
        users.push(user)

        json = JSON.stringify(users, null, 4)

        writeFile('./data/users.json', json, 'utf8', error => {
            if(error){
                callback(error)
                return
            }
            callback(null)
        })
    })
}