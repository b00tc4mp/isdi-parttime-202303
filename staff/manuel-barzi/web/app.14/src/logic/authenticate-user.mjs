import { validateEmail, validatePassword } from './helpers/validators.mjs'
import { findUserByEmail } from './helpers/data-managers.mjs'

export default function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    if (foundUser.password !== password)
        throw new Error('wrong password')

    return foundUser.id
}