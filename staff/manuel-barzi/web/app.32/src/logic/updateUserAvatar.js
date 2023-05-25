import { validateUrl, validateId } from './helpers/validators'
import { saveUser, findUserById } from '../data'

export default function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    user.avatar = avatar

    saveUser(user)
}