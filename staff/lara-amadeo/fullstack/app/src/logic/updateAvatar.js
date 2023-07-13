
// import { validateBase64ImageFormat } from "./helpers/validators.js"  

import { context } from "./context"

/**
 * Places the new avatar in user database 
 * @param {string} token user's id
 * @param {url} url avatar url
 * @returns new avatar url
 */

export function updateAvatar(token, url, callback) {
    if (!url) throw new Error('Image not uploaded correctly')

    const data = { avatar: url }

    return fetch('http://localhost:4000/users/avatar', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res !== 204) res.json().then(({ error }) => { throw new Error(error) })
        })

}