
import { validateEmail } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"

export function getLoggedUser(email) {
    validateEmail(email)
    
    const foundUser = findUserByEmail(email)
    if(!foundUser) throw new Error('user not found')

    const user = {
        name: foundUser.name,
        email: foundUser.email
    }

    //loggedUserName = foundUser.name
    
    return user
}