import { validateId, validateCallback } from './helpers/validators'
import { saveUser, findUserById } from '../data'

export default function updateUserMode(userId, mode, callback) {
    validateId(userId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        user.mode = mode

        saveUser(user, () => callback)
    })
}