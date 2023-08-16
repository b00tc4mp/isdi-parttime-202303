import { validators } from "com"
import { EXPO_PUBLIC_API_URL } from '@env'

const { validateEmail, validatePassword } = validators
export default (email) => {
    validateEmail(email)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/forgotPassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(res => {
            if (res.status !== 201)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}
