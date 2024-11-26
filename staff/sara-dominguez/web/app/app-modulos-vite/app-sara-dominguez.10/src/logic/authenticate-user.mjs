console.log('load authenticate-user.mjs')

import { validateEmail, validatePassword } from "./helpers/validators.mjs"
import { findUserByEmail } from "./helpers/data-managers.mjs"

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

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/