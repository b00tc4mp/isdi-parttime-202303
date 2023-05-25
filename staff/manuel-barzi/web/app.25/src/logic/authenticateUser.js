import { validateEmail, validatePassword } from './helpers/validators.js'
import { findUserByEmail } from './helpers/data-managers.js'

export default function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const user = findUserByEmail(email)

    if (!user)
        throw new Error('user not found')

    if (user.password !== password)
        throw new Error('wrong password')

    return user.id
}