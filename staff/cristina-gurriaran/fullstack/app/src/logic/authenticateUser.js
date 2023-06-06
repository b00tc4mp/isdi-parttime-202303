import { validators } from 'com'
import { findUserByEmail } from '../data'
const { validateEmail, validatePassword, validateCallback } = validators


export default function authenticateUser(email,password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    findUserByEmail(email, user => {

        if (!user) {
            callback (Error ("user not found"))
            return
        }

        if (user.password !== password) {
            callback(Error ("wrong password"))
            return
        }

        callback(null, user.id)
    })
}