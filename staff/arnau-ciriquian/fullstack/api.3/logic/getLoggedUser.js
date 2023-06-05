import fs from "fs"
import { validateCallback, validateId } from "../../com/validators.js"

export default function getLoggedUser(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    fs.readFile('../data/users.json', 'utf-8', (error, json) => {
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

        const _user = {
            name: user.name
        }

        // si importo el DEFAULTAVATAR JA NO FARA FALTA
        if (user.avatar) {
            _user.avatar = user.avatar
        }

        callback(null, _user)
    })
}