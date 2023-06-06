import { emailValidation, passwordValidation } from '../../assets/js/utility.js'
import { findUserByEmail } from './UserOperations.js'

export default function authenticateUser(email, password) {
    emailValidation(email)
    let cPassword=btoa(password)
    passwordValidation(cPassword)

    const foundUser = findUserByEmail(email)
    
    if (!foundUser)
        throw new Error('user not found')

    if (foundUser.password !== cPassword)
        throw new Error('wrong password')

    return foundUser.gid
}