import { validators } from 'com'

const { validateName, validateEmail, validatePassword, } = validators

export default (name, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error("Passwords do not match, please try again");
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => {
            if (res.status === 201)
                return

            return res.json()
                .then(body => {
                    throw new Error(body.error)
                })
        })
}