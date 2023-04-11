import { validateUrl, validateId } from './helpers/validators.mjs'
import { findUserById } from './helpers/data-managers.mjs'

export default function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    foundUser.avatar = avatar
}