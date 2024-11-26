const { readFile } = require('fs')
// const { validators: { validateId, validateCallback } } = require('com')

module.exports = (userId, callback) => {
    // validateId(userId, 'user id')
    // validateCallback(callback)

    //readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    readFile(`data/users.json`, (error, json) => {

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

        const { name, email, avatar } = user

        const user2 = { name, email, avatar }

        callback(null, user2)
    })
}