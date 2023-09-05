import { validators } from 'com'
const { validateCallback, validateId } = validators

import { findUserById } from "../data"

export function getLoggedUser(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        const _user = {
            name: user.name,
        }

        //en ppi no fa falta passar-ho per if ja, esta predeterminat amb el DEFAULTAVATAR
        if (user.avatar) {
            _user.avatar = user.avatar
        }

        callback(null, _user)
    })
}