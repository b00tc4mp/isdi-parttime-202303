import { validateCallback, validateId } from "./helpers/validators"
import { findUserById } from "../data"

export function getLoggedUser(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!foundUser) {
            callback(new Error('user not found'))

            return
        }

        const _user = {
            name: user.name,
        }

        if (user.avatar) {
            _user.avatar = user.avatar
        }

        callback(null, _user)
    })
}