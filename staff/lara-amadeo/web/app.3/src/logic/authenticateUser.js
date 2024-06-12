import { findUserbyEmail } from "./helpers/data-managers.js"

/**
 * Authenticates a user by email and password
 * @param {string} email user's email 
 * @param {string} password user's password 
 * @returns {string} user's id
 */

export const authenticateUser = (inputEmail, inputPassword) => {
    const foundUser = findUserbyEmail(inputEmail)

    if (!foundUser) throw new Error('User not found')
    if (foundUser.password !== inputPassword) throw new Error('Invalid email or password')

    return foundUser.id
}