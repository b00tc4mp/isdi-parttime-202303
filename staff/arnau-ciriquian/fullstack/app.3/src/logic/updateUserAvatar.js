import { validators } from 'com'
const { validateUrl, validateId, validateCallback } = validators

import { saveUser, findUserById } from "../data"

export function updateUserAvatar(userId, avatar, callback) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            new Error('user not found')

            return
        }

        user.avatar = avatar

        saveUser(user, () => callback(null))
    })
}