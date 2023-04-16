import { validateId } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'

export default function retrieveUserName(userId) {
    validateId(userId)

    const foundUser = findUserById(userId)
    if (!foundUser) return ""

    return foundUser.name
}