import { validateEmail, validatePassword } from './helpers/validators'
import { findUserByEmail } from './helpers/data-managers'

/**
 * Authenticates a user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */
export default function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (foundUser === undefined || foundUser.password !== password)
        throw new Error('wrong email or password')

    return foundUser.id
}