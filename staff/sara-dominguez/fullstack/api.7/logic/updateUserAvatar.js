const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUserAvatar, validateCallback } } = require('com')

module.exports = function updateUserAvatar(id, newAvatar, callback) {
    validateId(id)
    validateUserAvatar(newAvatar)
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
        user.avatar = newAvatar

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
