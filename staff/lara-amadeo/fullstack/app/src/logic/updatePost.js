
/**
 * 
 * @param {string} postId post's id
 * @param {URL} image post's image
 * @param {string} text post's caption 
 */

export default function updatePost(token, postId, image, text) {

    const data = { image, text }


    return fetch(`http://localhost:4000/posts/update/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })
}