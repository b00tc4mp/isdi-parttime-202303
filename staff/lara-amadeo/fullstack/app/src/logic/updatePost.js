
/**
 * 
 * @param {string} postId post's id
 * @param {URL} image post's image
 * @param {string} text post's caption 
 */

import { context } from "./context"

export default function updatePost(postId, image, text) {

    const data = { image, text }


    return fetch(`http://localhost:4000/posts/update/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })
}