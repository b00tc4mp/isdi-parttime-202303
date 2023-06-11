import { validators } from 'com'
import { findUserByEmail } from '../../data.js'
const { validateEmail, validatePassword, validateCallback } = validators

// console.log(validators)
export default function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    findUserByEmail(email, user => {
        if (!user) {
            callback(new Error('User or password incorrect'))

            return
        }

        if (!user.password) {
            callback(new Error('User or password incorrect'))

            return
        }
        callback(null, user.id)

    })

}