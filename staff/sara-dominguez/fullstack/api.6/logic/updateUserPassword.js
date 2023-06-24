const { validators: { validateId, validatePassword, validateUserConfirmNewPassword, validateCallback } } = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function UpdateUserPassword(
    userId,
    password,
    userNewPassword,
    userConfirmNewPassword,
    callback
) {
    validateId(userId)
    validatePassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)
    validateCallback(callback)

    if (userNewPassword !== newPasswordConfirm) {
        throw new Error('New password and confirm must be the same')
    }

    if (userNewPassword !== password) {
        throw new Error('New password must be different from the current password')
    }

    readFile(`${proccess.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('Incorrect password'))
        }

        user.password = userNewPassword
        json = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
            if (error) {
                callback(error)

                return
            }

            callback(null)

        })
    })
}