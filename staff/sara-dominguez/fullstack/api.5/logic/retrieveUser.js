const { readFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrieveUser(id, callback) {
    validateId(id)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === id)

        if (!user) {
            callback(new Error(`user with id ${id} not found`))

            return
        }

        const { name, email, avatar } = user

        const user2 = { name, email, avatar }


        callback(null, user2)
    })



}
