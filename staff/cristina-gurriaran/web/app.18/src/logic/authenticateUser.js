import { validateEmail, validatePassword, validateCallback} from './helpers/validators.js'
import {findUserByEmail} from '../data.js'


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