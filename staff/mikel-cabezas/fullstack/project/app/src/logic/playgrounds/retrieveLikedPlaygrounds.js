import { validators } from "com";
const { validateToken } = validators
import { EXPO_PUBLIC_API_URL } from '@env'


export default function retrieveLikedPlaygrounds(token) {
    validateToken(token);

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/likedPlaygrounds`, {
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
