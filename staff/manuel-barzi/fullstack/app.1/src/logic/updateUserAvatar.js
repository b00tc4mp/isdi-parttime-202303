import { validateUrl, validateId, validateCallback } from 'com'
import { saveUser, findUserById } from '../data'

export default function updateUserAvatar(userId, avatar, callback) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        user.avatar = avatar

        saveUser(user, () => callback(null))
    })
}