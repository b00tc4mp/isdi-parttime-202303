import { findUserById } from "./helpers/data-managers"
import { validateUrl, validateId } from "./helpers/validators"

export function updateUserAvatar(userId, avatar) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')
    const foundUser = findUserById(userId)

    if (!foundUser) throw new Error('user not found')

    foundUser.avatar = avatar
}