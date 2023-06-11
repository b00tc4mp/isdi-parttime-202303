import { validators } from "com"
import { findUserById, saveUser } from "../../data.js"

const { validateCallback, validateEmail, validateUserId } = validators
export default function updateUserEmail(userId, newEmail) {
    validateEmail(newEmail)
    validateUserId(userId)
    validateCallback(callback)

    const user = findUserById(userId)

    const currentUserEmail = findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
        const _user = {
            name: user.name,
            image: user.image
        }

        return _user
    })

    if (user.email !== currentUserEmail.email && user.email === newEmail) {
        throw new Error('Email already registered')
    }
    if (user.email === currentUserEmail.email && user.email !== newEmail) {
        user.email = newEmail
        saveUser(user)
    }
}
