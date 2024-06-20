const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword, validateCallback } } = require('com')

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')
    validateCallback(callback)

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        if (user.password !== password) {
            callback(new Error('Error the pasword is invalid', {cause: "password"}))

            return
        }

        user.password = newPassword

        const json2 = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}