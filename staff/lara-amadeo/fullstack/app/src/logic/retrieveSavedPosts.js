import { context } from "./context";

export default function retrieveSavedPosts() {
    return fetch('http://localhost:4000/posts/saved', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })

}