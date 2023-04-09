import { validateEmail, validatePassword } from "./helpers/validators.mjs"
import { users } from "../data.mjs"
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
            // id: users[users.length].slice(5) + parseInt(users.length + 1),
            name: name,
            email: email,
            password: password
        })
        return true
    }
}
