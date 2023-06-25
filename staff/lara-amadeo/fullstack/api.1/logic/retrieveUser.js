const { readFile } = require('fs')

module.exports = function retrieveUser(userId, callback) {
    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const foundUser = users.find(user => user.id === userId)

        if (!foundUser) {
            callback(new Error(`User with id ${userId} not found`))
            return
        }

        const user = {
            username: foundUser.username,
            email: foundUser.email,
            avatar: foundUser.avatar
        }
        callback(null, user)
    })
}