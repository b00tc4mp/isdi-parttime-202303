import { validators } from 'com'
import context from './context'

const { validateEmail, validatePassword } = validators

/* 
* app/logic/loginUser.js
* Authenticates a user by email and password  andd keeps the session token in logic context
* @param {String} email The user's email
* @param {String} password The user's passaword
*
*/

export default (email, password) => {
    validateEmail(email, 'email')
    validatePassword(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.error)
                })
        })
        .then(token => {
            context.token = token
        })
}