
/**
 * Returns all the posts of the database in reverse order
 * @param {string} token user's id
 * @returns {Array} posts in reverse order
 */

export default function retrievePosts(token) {
    return fetch('http://localhost:4000/posts', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
}