const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId } } = require('com')

module.exports = function deleteAccount(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const index = users.findIndex(user => user.id === userId)

        if (index === -1) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        if (index !== -1) {
            console.log(index)
            users.splice(index, 1)
        }

        json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}