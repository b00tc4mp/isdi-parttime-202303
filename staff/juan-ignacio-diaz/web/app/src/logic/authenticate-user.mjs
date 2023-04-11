import { validateEmail, validatePassword } from './helpers/validators.mjs'
import { findUserByEmail } from './helpers/data-managers.mjs'

export default function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (!foundUser || foundUser.password !== password) 
        throw new Error("wrong email or password")
    
    return foundUser.id
}