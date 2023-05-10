import { validateEmail, validatePassword } from './helpers/validators.js'
import { findUser } from './helpers/data-managers.js'

export default function authenticateUser(userEmail, userPassword) {
    validateEmail(userEmail)
    validatePassword(userPassword)

    const foundUser = findUser(userEmail)
    
    if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password', {cause: "ownError"})

    console.log(`user authenticated. user:${userEmail} - pass:${userPassword}`)
    
    return foundUser.id
}