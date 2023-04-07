import { validateEmail, validateName, validateNewPassword, validatePasswordConfirm } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"

export function addNewUser(name, email, password, passwordConfirm) {
    validateName(name)
    validateEmail(email)

    const foundUser = findUserByEmail(email)
    if (foundUser) throw new Error ('user already exists')
    
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)
    
    users.push({
        name: name,
        email: email,
        password: password,
        })
}