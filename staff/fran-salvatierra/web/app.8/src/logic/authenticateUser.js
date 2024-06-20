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

export default function authenticateUser(email, passowrd) {

    validateEmail(email)
    validatePassword(passoword)

    const user = findUserByEmail

    if(!user)

        throw new Error('user not found')

    if(user.password !== password)
        throw new Error('wrong password')

    return user.id
}
