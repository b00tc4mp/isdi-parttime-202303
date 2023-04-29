import { validateEmail, validateName, validateNewPassword, validatePasswordConfirm } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"
import { saveUsers, users } from "../data.js"
import { DEFAULT_AVATAR_URL } from "../pages/home-page.js"

export function addNewUser(name, email, password, passwordConfirm) {
    validateName(name)
    validateEmail(email)

    const foundUser = findUserByEmail(email)
    if (foundUser) throw new Error ('user already exists')
    
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)

    let id = 'user-1'

    const _users = users()

    const lastUser = _users[_users.length - 1]

    if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
    }
    
    _users.push({
        id,
        name,
        email,
        password,
        avatar: DEFAULT_AVATAR_URL
    })

    saveUsers(_users)
}