import { findUserByEmail, findUserById } from "./helpers/data-managers.js"
import { validateId } from "./helpers/validators.js"
import { saveUser } from "../data.js"

export function updateUserEmail(userId, email, newEmail, newEmailConfirmation, password) {
    validateId(userId, 'user id')
    const user = findUserById(userId)
    const newEmailUserFound = findUserByEmail(newEmail)
    
    if (!user) throw new Error('user not found')
    if (email !== user.email) throw new Error('email does not correspond to actual email')
    if (!newEmail.match(/\S+@\S+\.\S+/)) throw new Error('new email is not a valid adress')
    if (newEmailUserFound) throw new Error('new email already registered')
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')
    if (password !== user.password) throw new Error('incorrect password')
    
    user.email = newEmail
    saveUser(user)
}