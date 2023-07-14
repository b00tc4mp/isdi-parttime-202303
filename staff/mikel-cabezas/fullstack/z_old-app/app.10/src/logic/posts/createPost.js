import { validators, utils } from 'com'
// import { isTokenValid } from 'com/utils'

const { isTokenValid } = utils
const { validateToken, validateText } = validators

export function createPost(token, image, title, text, location, callback) {
    validateToken(token)
    validateText(title)
    validateText(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text, image, location })
    })
        .then(res => {
            if (res.status !== 201)
                return res.json().then(({ error: message }) => { throw new Error(message) })
            // return res.json()
        })
}
