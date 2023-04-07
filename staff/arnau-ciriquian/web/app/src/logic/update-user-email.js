import { findUserByEmail, findUserById } from "./helpers/data-managers.js"
import { context } from "../ui.js"

export function updateUserEmail(userId, email, newEmail, newEmailConfirmation, password) {
    const foundUser = findUserById(userId)
    const newEmailUserFound = findUserByEmail(newEmail)
    
    if (!foundUser) throw new Error('user not found')
    if (email !== foundUser.email) throw new Error('email does not correspond to actual email')
    if (!newEmail.match(/\S+@\S+\.\S+/)) throw new Error('new email is not a valid adress')
    if (newEmailUserFound) throw new Error('new email already registered')
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')
    if (password !== foundUser.password) throw new Error('incorrect password')
    
    foundUser.email = newEmail
}