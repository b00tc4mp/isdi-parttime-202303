import { validateName, validateEmail, validatePassword, checkNewUser } from './helpers/validators'
import { users, saveUsers } from '../data'

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