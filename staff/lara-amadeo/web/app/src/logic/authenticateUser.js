import { findUserbyEmail } from "../data"

/**
 * Authenticates a user by email and password
 * @param {string} email user's email 
 * @param {string} password user's password 
 * @returns {string} user's id
 */

export const authenticateUser = (inputEmail, inputPassword, callback) => {
    findUserbyEmail(inputEmail, foundUser => {
        if (!foundUser){
            callback(new Error('User not found'))

            return
        }

        if (foundUser.password !== inputPassword) {
            callback (new Error('Invalid email or password'))

            return
        } 
        
        callback(null, foundUser.id)
    })
}