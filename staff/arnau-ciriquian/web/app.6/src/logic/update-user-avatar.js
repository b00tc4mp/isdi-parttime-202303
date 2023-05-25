import { findUserById } from "./helpers/data-managers"
import { validateUrl, validateId } from "./helpers/validators"
import { saveUser } from "../data"

export function updateUserAvatar(userId, avatar) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')
    const user = findUserById(userId)

    if (!user) throw new Error('user not found')

    user.avatar = avatar
    saveUser(user)
}