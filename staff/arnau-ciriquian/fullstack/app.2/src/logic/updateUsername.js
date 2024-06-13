import { saveUser, findUserById } from "../data"
import { validateName, validateId, validateCallback, validatePassword } from "../../../com/validators"

export function updateUsername(userId, oldUsername, newUsername, password, callback) {
    validateId(userId)
    validateName(oldUsername, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)
    validateCallback(callback)

    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (oldUsername !== user.name) {
            callback(new Error('old username is not correct'))

            return
        }

        if (password !== user.password) {
            callback(new Error('password is not correct'))

            return
        }

        user.name = newUsername

        saveUser(user, () => callback(null))
    })
}