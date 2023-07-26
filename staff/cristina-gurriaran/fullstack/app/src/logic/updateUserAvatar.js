import { validators , errors } from 'com'
const { validateUrl  } = validators
import context from './context'


export default (avatar) => {
    validateUrl(avatar, 'avatar url APP')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ avatar })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)  
    })()
}