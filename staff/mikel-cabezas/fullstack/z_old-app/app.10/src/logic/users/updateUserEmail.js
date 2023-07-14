import { validators } from "com"
import { findUserById, saveUser } from "../../data.js"

const { validateEmail, validateToken } = validators
export default (token, email) => {
    validateEmail(email)
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return res.json()
        })


    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/email`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    const userData = { email }
    const json = JSON.stringify(userData)

    xhr.send(json)
}
