import { validateEmail, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/dataManagers.js"

export function authenticateUser (email, password) {
    validateEmail(email)    
    validatePassword(password)
 

    let foundUser= findUserByEmail(email)

    if(!foundUser) 
        throw new Error ('User not found') 

    if (foundUser.password !== password) 
        throw new Error ('Wrong password')
    
    return foundUser.id
}
