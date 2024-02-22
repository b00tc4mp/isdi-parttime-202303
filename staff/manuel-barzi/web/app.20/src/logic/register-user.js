import { validateName, validateEmail, validatePassword } from './helpers/validators.js'
import { findUserByEmail } from './helpers/data-managers.js'
import { users, saveUsers } from '../data.js'

export default function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (foundUser)
        throw new Error('user already exists')

    let id = 'user-1'

    const lastUser = users[users.length - 1]

    if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    const user = {
        id,
        name,
        email,
        password
    }

    users.push(user)

    saveUsers()
}