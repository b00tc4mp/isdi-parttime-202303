import context from "./context"
import { validators } from 'com'

const { validateUrl } = validators

export default (avatar) => {
    validateUrl(avatar, 'avatar url')
 
    return (async () => {
        const res = fetch(`${import.meta.env.VITE_API_URL}/users/updateAvatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ avatar })
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}