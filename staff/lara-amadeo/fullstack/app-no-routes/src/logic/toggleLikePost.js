

/**
 * Toggles the like or unlike for a post
 * @param {object} post A post object
 * @param {string} token user's id
 */

export default function toggleLikePost(postId, token) {

    return fetch(`http://localhost:4000/posts/like/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })

}



