import { validateEmail, validatePassword } from "./helpers/validators.js"
import { users } from "../data.js"
export function registerUser(name, email, password) {
    validateEmail(email)
    validatePassword(password)
    var checkEmail = users.find(user => user.email === email)
    if(checkEmail) {
        throw new Error('Email already registered')
    }
    if(checkEmail !== email) {
        name = name.trim()
        users.push({
            id: 'user-' + parseInt(users.length + 1),
            name: name,
            email: email,
            password: password
        })
        return true
    }
}
