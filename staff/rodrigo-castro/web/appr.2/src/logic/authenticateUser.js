import { validateEmail, validatePassword } from './helpers/validators'
import { findUser } from './helpers/dataManagers'

export default function authenticateUser(userEmail, userPassword) {
    validateEmail(userEmail)
    validatePassword(userPassword)

    const foundUser = findUser(userEmail)
    
    if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password', {cause: "ownError"})

    return foundUser.id
}