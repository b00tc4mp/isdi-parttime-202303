import { validators } from 'com'
const { validateEmail, validatePassword } = validators

// console.log(validators)
export default (email, password) => {
    validateEmail(email)
    validatePassword(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return res.json()
        })
        .then((token) => token)


}