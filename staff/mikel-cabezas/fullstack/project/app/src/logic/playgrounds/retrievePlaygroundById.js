import { EXPO_PUBLIC_API_URL } from '@env'
import { validators } from "com"

const { validateToken } = validators
export default function retrievePlaygroundById(token, playgroundId) {
    validateToken(token)
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/playground/${playgroundId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })
            return res.json()
        })
}
