import context from "./context"

import { validators } from 'com'
const { validateUrl } = validators

export default (avatar) => {
    validateToken(token) 
    validateUrl(avatar, 'avatar url')
 
    return fetch(`${import.meta.env.VITE_API_URL}/users/updateAvatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ avatar })
    })
        .then(res => {
            if (res.status === 204)
                return

            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}