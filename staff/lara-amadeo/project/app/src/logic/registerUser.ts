// import { validateEmail, validatePassword } from '../../../com/validators'
import { context } from './context'

/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

type Params = {
    name: string,
    username: string,
    email: string,
    password: string
}

export const registerUser = ({ name, username, email, password }: Params) => {

    // validateEmail(email)
    // validatePassword(password)

    const user = { name, username, email, password }

    return fetch('http://localhost:1234/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
        .then(token => {
            context.token = token
        })
}