import { context } from "./context";


export default function togglePostVisibility(postId) {
    return fetch(`http://localhost:4000/posts/visibility/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })
}