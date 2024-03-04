require('dotenv').config()

const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateEmail, validateCallback } } = require('com')

module.exports = (userId, newEmail, newEmailConfirm, callback) => {
    validateId(userId, 'user Id')
    validateEmail(newEmail, 'new Email')
    validateEmail(newEmailConfirm, 'new Email Confirm')
    validateCallback(callback)


    if (newEmail !== newEmailConfirm) throw new Error(`New emails don't match.`)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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

        const previousEmail = user.email

        if (previousEmail === newEmail) throw new Error(
            `New email must be different as previous email`
        )

        if (user.email !== previousEmail) {
            callback(new Error(`your new email don\'t match the confirmation 👎`))

            return
        }

        user.email = newEmail
        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)

        })

    })

}