import { validateId } from './helpers/validators.mjs'
import { findUserById } from './helpers/data-managers.mjs'

export default function retrieveUser(userId) {
    validateId(userId, 'user id')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    const user = {
        name: foundUser.name
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user
}
