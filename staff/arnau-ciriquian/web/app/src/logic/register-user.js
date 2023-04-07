import { validateEmail, validateName, validateNewPassword, validatePasswordConfirm } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"
import { users } from "../data.js"

export function addNewUser(name, email, password, passwordConfirm) {
    validateName(name)
    validateEmail(email)

    const foundUser = findUserByEmail(email)
    if (foundUser) throw new Error ('user already exists')
    
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)

    let id = 'user-1'

    const lastUser = users[users.length - 1]

    if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
    }
    
    users.push({
        id,
        name,
        email,
        password,
        })
}