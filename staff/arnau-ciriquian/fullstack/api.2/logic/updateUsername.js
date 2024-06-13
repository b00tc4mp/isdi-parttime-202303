import fs from "fs"
import { validateCallback, validateId, validateName, validatePassword } from "../../com/validators.js"

export default function updateUsername(userId, oldUsername, newUsername, password, callback) {
    validateId(userId)
    validateName(oldUsername, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)
    validateCallback(callback)

    if (newUsername === oldUsername) {
        callback(new Error('new username is equal to old username'))

        return
    }

    fs.readFile('../data/users.json', 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (oldUsername !== user.name) {
            callback(new Error('old username is not correct'))

            return
        }

        if (password !== user.password) {
            callback(new Error('password is not correct'))

            return
        }

        user.name = newUsername

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