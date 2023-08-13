import { validators } from 'com'
const { validateToken, validatePostId } = validators

import { EXPO_PUBLIC_API_URL } from '@env'

export function toggleLikePlayground(token, playgroundId) {
    validateToken(token)
    validatePostId(playgroundId)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/playgrounds/${playgroundId}/likes`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })
        })
}
