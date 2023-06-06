import { validateId, validateUrl } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { saveUser } from '../data'

export default function updateUserAvatar(userId, avatar) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')

    const user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    user.avatar = avatar

    saveUser(user)
}