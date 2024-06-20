import { validators, errors } from 'com'
const { validateUrl, validateText } = validators
import context from './context'

export default function createWorkspot(image, name, location, description, category, features) {
    validateUrl(image, 'image url')
    validateText(name, 'name')
    validateText(description, 'description')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workspots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ image, name, location, description, category, features })
        })

        if (res.status === 201)
            return

        const { message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)

    })()
}