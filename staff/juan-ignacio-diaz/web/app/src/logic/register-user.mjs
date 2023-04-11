import {users} from "../data.mjs"
import {validateName, validateEmail, validatePassword} from "./helpers/validators.mjs"
import {findUserByEmail, newUserId} from './helpers/data-managers.mjs'

export default function registerUser (name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    
    if (findUserByEmail(email)) 
        throw new Error("user already exists")

    users.push ({
        id: newUserId(),
        name: name,
        email: email,
        password: password
    })
}