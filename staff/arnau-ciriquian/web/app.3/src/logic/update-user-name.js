import { saveUser } from "../data.js"
import { findUserById } from "./helpers/data-managers.js"
import { validateName, validateId } from "./helpers/validators.js"

export function updateUsername(userId, oldUsername, newUsername, password) {
    validateId(userId)
    const user = findUserById(userId)
    if (!user) throw new Error('user not found')

    validateName(oldUsername, 'old username')
    if (oldUsername !== user.name) throw new Error('old username is not correct')

    validateName(newUsername, 'new username')
    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    if (password !== user.password) throw new Error('password is not correct')

    user.name = newUsername
    saveUser(user)
}