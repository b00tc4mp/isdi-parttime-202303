import context from './context'
import { errors } from 'com'

export default (nameSearched) => {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workspots/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ nameSearched })
        })
        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}