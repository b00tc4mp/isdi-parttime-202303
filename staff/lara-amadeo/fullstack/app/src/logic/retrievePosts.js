
/**
 * Returns all the posts of the database in reverse order
 * @param {string} token user's id
 * @returns {Array} posts in reverse order
 */

import { context } from "./context";

export default function retrievePosts() {
    return fetch('http://localhost:4000/posts', {
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
        .then(posts => {
            console.log(posts)

            return posts
        })
}