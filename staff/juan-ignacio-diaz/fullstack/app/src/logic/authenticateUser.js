//import { validateEmail, validatePassword, validateCallback } from './helpers/validators'
import { validators } from 'com'
const { validateEmail, validatePassword, validateCallback } = validators

import { findUserByEmail } from '../data'

export default function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)
 
    findUserByEmail(email, user => {
        if (!user || user.password !== password) {
            callback(new Error('wrong email or password'))

            return
        }

        callback(null, user.id)
    })
}