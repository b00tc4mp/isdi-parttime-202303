import { validators } from 'com'
const { validateName, validateEmail, validatePassword } = validators

export default (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

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

        const { error: message } =  await res.json()

        throw new Error(message)
    })()

}