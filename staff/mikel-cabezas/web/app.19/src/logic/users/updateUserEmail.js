import { findUserById } from "../helpers/dataManagers.js"
import { validateEmail } from "../helpers/validators.js"
import { saveUser } from "../../data.js"

export default function updateUserEmail(userId, newEmail) {
    const user = findUserById(userId)

    validateEmail(newEmail)
    const currentUserEmail = findUserById(userId)

        if (user.email !== currentUserEmail.email && user.email === newEmail){
            throw new Error('Email already registered')
        }
        if (user.email === currentUserEmail.email && user.email !== newEmail){
            user.email = newEmail
            saveUser(user)
        }
 }
