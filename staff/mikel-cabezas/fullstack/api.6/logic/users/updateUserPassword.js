require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validatePassword, validateNewPassword, validateCallback } } = require('com')

module.exports = (userId, currentPassword, newPassword, repeatPassword, callback) => {
    validateUserId(userId)
    validateCallback(callback)
    validatePassword(currentPassword)
    validatePassword(newPassword)
    validatePassword(repeatPassword)
    validateNewPassword(currentPassword, newPassword, repeatPassword)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found`))

            return
        }

        if (currentPassword.trim() !== user.password)
            callback(new Error('Not your current password'))

        if (user.password === newPassword) {
            callback(new Error('You need to set a new password'))
        }

        user.password = newPassword
        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, 'utf8', error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })


}