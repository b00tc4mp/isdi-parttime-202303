import { validators, errors } from 'com'

const { validateName, validateEmail, validatePassword } = validators

export default (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    // return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ name, email, password })
    // })
    //     .then(res => {
    //         if (res.status === 201)
    //             return

    //         return res.json()
    //             .then(({ type, message }) => {
    //                 throw new errors[type](message)
    //             })
    //     })

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}