import { validateEmail, validatePassword } from './helpers/validators.js'
import {findUserByEmail} from '../data.js'


export default function authenticateUser(email,password, callback) {
    validateEmail(email)
    validatePassword(password)

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