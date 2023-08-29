import { validators, errors } from 'com'
const { validateId, validateUrl, validateText } = validators
import context from './context'


export default (workspotId, text) => {
    validateId(workspotId, 'workspot id')
    validateUrl(text, 'text')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workspots/${workspotId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ text })
        })
        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}
