import { validateEmail, validatePassword } from './helpers/validators'
import { findUserByEmail } from './helpers/data-managers'

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