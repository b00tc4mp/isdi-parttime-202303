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
        password: password,
        avatar: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-1exKI3suWF8%2FVRLNC-2f60I%2FAAAAAAABFJE%2FZMNDohDORh0%2Fs00%2Fminnewanka-paisajes-naturales.jpg&f=1&nofb=1&ipt=dfd15c79b7f8d0e53021de9cdaba2659a4b4322307300f5732046cbb586ad386&ipo=images',
        favs: [],
    })

    saveUsers(_users)
}