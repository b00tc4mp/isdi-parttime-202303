import { validateName, validateEmail, validatePassword } from './helpers/validators'
import { findUserByEmail } from './helpers/data-managers'
import { users, saveUsers } from '../data'

export default function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    debugger

    const foundUser = findUserByEmail(email)

    if (foundUser)
        throw new Error('user already exists')

    let id = 'user-1'

    const _users = users()

    const lastUser = _users[_users.length - 1]

    if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)


    const user = {
        id,
        name,
        email,
        password,
        avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    }


    _users.push(user)

    saveUsers(_users)
}