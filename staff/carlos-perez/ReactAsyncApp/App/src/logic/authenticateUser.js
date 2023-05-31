import { findUserByEmail } from "./helpers/data-manager.js"

export function authenticateUser(email, password) {

    const user = findUserByEmail(email)

    if (!user){
        callback(new Error('user not found'))
        return
    }

    if (user.password !== password){
        callback(new Error('wrong password'))
        return
    }
    callback(null, user.id)
}