import { validators, errors } from 'com'
const { validateId, validateUrl, validateText } = validators
import context from './context'


export default (workspotId, image, name, location, description, category, features) => {
    validateId(workspotId, 'workspot id')
    validateUrl(image, 'image url')
    validateText(description, 'description')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workspots/${workspotId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ image, name, location, description, category, features })
        })
        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}
