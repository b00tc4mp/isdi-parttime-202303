import { validateUrl, validateId } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { saveUsers } from '../data.js'

export default function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    user.avatar = avatar

    saveUsers()
}