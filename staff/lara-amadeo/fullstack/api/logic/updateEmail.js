const { readFile, writeFile } = require("fs")
const { validators: { validateEmail, validateCallback } } = require('com')


module.exports = function updateEmail(userId, email, newEmail, callback) {
    validateEmail(email)
    validateEmail(newEmail)
    validateCallback(callback)

    readFile("./data/users.json", (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if(user.email !== email){
            callback(new Error('Current email incorrect'))

            return
        }

        user.email = newEmail

        json = JSON.stringify(users)

        writeFile("./data/users.json", json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}