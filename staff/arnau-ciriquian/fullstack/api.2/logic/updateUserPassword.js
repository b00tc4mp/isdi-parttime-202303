import fs from "fs"
import { validateNewPassword, validatePasswordConfirm, validateId, validateCallback } from "../../com/validators.js"

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirmation, callback) {
    validateId(userId)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')
    validateCallback(callback)

    if (newPassword === password) throw new Error('new password is the same as old password')

    fs.readFile('../data/users.json', 'utf-8', (error, json) => {
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
            callback(new Error('old password is not correct'))

            return
        }

        user.password = newPassword

        json = JSON.stringify(users)

        fs.writeFile('../data/users.json', json, 'utf-8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}