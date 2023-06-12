import { validators } from 'com'
const { validateEmail, validatePassword } = validators
/**
 * Authenticates a user by email and password
 * @param {string} email user's email 
 * @param {string} password user's password 
 * @returns {string} user's id
 */

export const authenticateUser = (email, password, callback) => {
    validateEmail(email)
    validatePassword(password)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if(status !== 200){
            const { response: json } = xhr
            const { error } = JSON.parse(json)
            callback(new Error(error))

            return
        }

        const { response: json } = xhr
        console.log(json)
        const { userId } = JSON.parse(json)

        callback(null, userId)
    }
    
        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('POST', 'http://localhost:4000/users/auth')
    
        xhr.setRequestHeader('Content-Type', 'application/json')
    
        const credentials = {email, password}
        const json = JSON.stringify(credentials)
    
        xhr.send(json)
}
