import { validators } from 'com'
const { validateEmail, validatePassword, validateCallback } = validators

import { findUserByEmail } from "../data"

export function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    findUserByEmail(email, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (user.password !== password) {
            callback(new Error('wrong password'))

            return
        }

        callback(null, user.id)
    })
}