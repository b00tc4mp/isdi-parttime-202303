
/**
 * Deletes a post from the database
 * @param {string} token user's id
 * @param {string} postId post's id
 */

export default function deletePost(token, postId) {
    return fetch(`http://localhost:4000/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })

}