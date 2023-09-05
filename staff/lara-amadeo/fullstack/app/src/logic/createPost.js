/**
 * Creates a post with the params given
 * @param {string} token user's id
 * @param {url} image post's image url
 * @param {string} text post's caption
 * 
 */

import { context } from "./context"

export default function createPost(image, text) {
    const data = { image, text }

    return fetch('http://localhost:4000/posts/new', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status !== 201) res.json().then(({ error }) => { throw new Error(error) })
        })

}