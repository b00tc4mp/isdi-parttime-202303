import { findUserById } from "./helpers/data-managers"
import { validateName, validateId } from "./helpers/validators"

export function updateUsername(userId, oldUsername, newUsername, password) {
    validateId(userId)
    const foundUser = findUserById(userId)
    if (!foundUser) throw new Error('user not found')

    validateName(oldUsername, 'old username')
    if (oldUsername !== foundUser.name) throw new Error('old username is not correct')

    validateName(newUsername, 'new username')
    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    if (password !== foundUser.password) throw new Error('password is not correct')

    foundUser.name = newUsername
}