import { validators, errors } from 'com'
const { validateId } = validators
import context from './context'

export default (workspotId) => {
    validateId(workspotId, 'workspot id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workspots/${workspotId}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${context.token}`
            }
        })
        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}