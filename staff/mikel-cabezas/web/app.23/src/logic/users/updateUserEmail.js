import { validateEmail } from "../helpers/validators.js"
import { findUserById, saveUser } from "../../data.js"

export default function updateUserEmail(userId, newEmail) {
    const user = findUserById(userId)

    validateEmail(newEmail)
    const currentUserEmail = findUserById(userId, user => {
        if(!user) {
            callback(new Error ('user not found'))

            return
        }
        const _user = {
            name: user.name, 
            image: user.image
        }

        return _user
    })

        if (user.email !== currentUserEmail.email && user.email === newEmail){
            throw new Error('Email already registered')
        }
        if (user.email === currentUserEmail.email && user.email !== newEmail){
            user.email = newEmail
            saveUser(user)
        }
 }
