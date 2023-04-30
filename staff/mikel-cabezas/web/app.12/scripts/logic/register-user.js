import { validateEmail, validatePassword } from "./helpers/validators.js"
import { users, saveUser } from "../data.js"

export function registerUser(name, email, password) {
    const _users = users()
    validateEmail(email)
    validatePassword(password)
    var checkEmail = _users.find(user => user.email === email)
    if(checkEmail) {
        throw new Error('Email already registered')
    }
    if(checkEmail !== email) {
        name = name.trim()
        const user = {
            id: 'user-' + parseInt(_users.length + 1),
            name: name,
            email: email,
            password: password,
            likedPosts: []
        }
        _users.push(user)
        saveUser(user)
        console.log(_users)
        return user.name
    }
}
