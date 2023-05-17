import { validateEmail, validatePassword } from './helpers/validators'
import { findUserByEmail } from '../data'

/**
 * Authenticates a user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */
export default function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)

    findUserByEmail(email, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
    
        if (user.password !== password) {
            callback(new Error('wrong password'))

            return
        }
    
        callback(null, user.id)
    })
}