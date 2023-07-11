

export default function togglePostVisibility(token, postId, callback) {
    return fetch(`http://localhost:4000/posts/visibility/${postId}`, {
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