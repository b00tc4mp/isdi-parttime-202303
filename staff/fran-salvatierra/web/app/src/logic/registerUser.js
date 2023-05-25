import { validateName, validateEmail, validatePassword, checkNewUser } from './helpers/validators'
import { users, saveUsers } from '../data'

/**
 * Register a user by name, email and password in the database
 * 
 * @param {string} name The user's username
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's information is added to the database
 */

export default function registerUser(name, email, password) {
    checkNewUser(email, users)
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    let id = 'user-1'

    const _users = users()

    const lastUser = _users[_users.length - 1]

    if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

 
    _users.push({
        id,
        name: name,
        email: email,
        password: password
    })

    saveUsers(_users)
}