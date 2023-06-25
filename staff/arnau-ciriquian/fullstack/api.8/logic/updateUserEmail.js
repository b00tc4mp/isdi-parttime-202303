const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId, validateEmail } } = require('com')

module.exports = (userId, email, newEmail, newEmailConfirmation, password, callback) => {
    validateId(userId, 'user id')
    validateCallback(callback)
    validateEmail(newEmail, 'new email')
    //new validator?
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')

    readFile('./data/users.json', 'utf-8', (error, json) => {
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

        if (user.email !== email) {
            callback(new Error(`email does not correspond to actual email`))

            return
        }

        if (user.password !== password) {
            callback(new Error(`incorrect password`))

            return
        }

        const checkedEmail = users.find(user => user.email === newEmail)

        if (checkedEmail) {
            callback(new Error('new email already registered'))

            return
        }

        user.email = newEmail

        json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf-8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}