import { findUserById, saveUser } from "../../data.js"
import { validateCallback, validateName, validateUserId } from "../helpers/validators.js"

export default function updateUserName(userId, newName, callback) {
    validateUserId(userId)
    validateName(newName)
    validateCallback(callback)

    const user = findUserById(userId, (error, user) => {
        if(!user) {
            callback(new Error ('user not found'))

            return
        }
        user.name = newName
            saveUser(user, () => callback(null))
    })
}