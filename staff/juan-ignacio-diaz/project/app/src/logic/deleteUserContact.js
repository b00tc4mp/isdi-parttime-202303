import context from "./context"
import { validators } from 'com'

const { validateId } = validators

export default (contactId) => {
    validateId(contactId, 'contact id')

    return (async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/contact/${contactId}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${context.token}`
            },
        })

        if (res.status === 204)
                return
            
        const { error: message } = await res.json()

        throw new Error(message)
    })()
}