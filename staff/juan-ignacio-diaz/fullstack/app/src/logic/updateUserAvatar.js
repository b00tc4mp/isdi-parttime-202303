import { validators } from 'com'
const { validateToken, validateUrl } = validators

export default (token, avatar) => {
    validateToken(token) 
    validateUrl(avatar, 'avatar url')
 
    return fetch(`${import.meta.env.VITE_API_URL}/users/updateAvatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ avatar })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return
        })   
        .catch(error => new Error(error)) 
}