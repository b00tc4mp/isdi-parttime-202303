
/**
 * Returns a post searched by id
 * @param {string} token user's id
 * @param {string} postId post's id
 * @returns {object} the founded post
 */

export default function retrievePost(token, postId) {

    return fetch(`http://localhost:4000/posts/post/${postId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })

}