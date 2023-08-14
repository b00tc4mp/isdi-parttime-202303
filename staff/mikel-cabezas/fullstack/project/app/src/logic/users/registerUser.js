import { validators } from "com"
import { EXPO_PUBLIC_API_URL } from '@env'

const { validateEmail, validatePassword } = validators
export default (name, email, password) => {
    validateEmail(email)
    validatePassword(password)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => {
            if (res.status !== 201)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}
