import { validateEmail, validatePassword, validateCallback } from "./helpers/validators.js"
import { findUserByEmail } from "../data.js"

/**
 * Authenticate a user by email and password
 * 
 * @param {string} email the user`s email
 * @param {string} password the user`s password
 * 
 * @returns {string} The user's id
 */

export function authenticateUser (email, password, callback) {
    validateEmail(email)    
    validatePassword(password)
    validateCallback(callback)
 

    findUserByEmail(email, foundUser =>{
        if(!foundUser) {
           callback(new Error ('User not found'))

            return
        }
    
        if (foundUser.password !== password) {
            callback(new Error ('Wrong password'))

            return
        }
        
        callback(null, foundUser.id)
        // este null es de que no ha habido errores, se indica primero)
    })
}

