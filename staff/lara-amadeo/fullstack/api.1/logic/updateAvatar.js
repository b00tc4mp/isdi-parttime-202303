const { readFile, writeFile } = require("fs")
const { validators: { validateText } } = require('com')

module.exports = function updateAvatar(userId, url, callback) {

    validateText(userId)

    if (!url) {
        callback(new Error('Image not uploaded correctly'))

        return
    }

    readFile("./data/users.json", "utf-8", (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        user.avatar = url

        json = JSON.stringify(users)

        writeFile("./data/users.json", json, (error) => {
            if (error) {
                callback(error)
            }

            callback(null)
        })
    })
}