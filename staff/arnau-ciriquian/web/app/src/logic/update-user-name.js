import { findUserByEmail } from "./helpers/data-managers.js"
import { validateName } from "./helpers/validators.js"

export function updateUsername(email, oldUsername, newUsername, password) {
    const foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')

    validateName(oldUsername, 'old username')
    if (oldUsername !== foundUser.name) throw new Error('old username is not correct')

    validateName(newUsername, 'new username')
    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    if (password !== foundUser.password) throw new Error('password is not correct')

    foundUser.name = newUsername
}