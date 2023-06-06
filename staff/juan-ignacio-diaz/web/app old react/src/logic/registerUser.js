import { users, saveUsers } from "../data"
import { validateName, validateEmail, validatePassword } from "./helpers/validators"
import { findUserByEmail, newUserId } from './helpers/dataManagers'

export default function registerUser (name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    
    if (findUserByEmail(email)) 
        throw new Error("user already exists")

    const tmpUsers = users()
    
    tmpUsers.push({
        id: newUserId(),
        name: name,
        email: email,
        password: password
    })

    saveUsers(tmpUsers)
}