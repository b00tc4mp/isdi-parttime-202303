import { validators } from 'com'
const { validateName, validateEmail, validatePassword } = validators

export default (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
 

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
        .catch(error => new Error(error))
}