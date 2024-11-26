console.debug('validated-user-newPasssword')

import { validateId, validatePassword, validateUserNewPassword, validateUserConfirmNewPassword, validateCallback } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js"

export function validatedNewPassword(userId, password, userNewPassword, userConfirmNewPassword, callback) {
    validateId(userId)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)
    validateCallback(callback)

    let user = findUserById(userId, user => {
        if (!user) {
            new Error('User not found')

            return
        }
        if (userNewPassword !== userConfirmNewPassword) {
            callback(new Error('New password and confirmed password do not match'))

            return
        }
        if (user.password !== password) {
            callback(new Error('wrong  actual password'))

            return
        }
        if (password === userNewPassword) {
            callback(new Error('You have to change the password'))

            return
        }

        user.password = userNewPassword
        saveUser(user, () => callback(null))
    })
}
