
/**
 * Returns a post searched by id
 * @param {string} token user's id
 * @param {string} postId post's id
 * @returns {object} the founded post
 */

export default function retrievePost(token, postId, callback) {

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if (status !== 200) {
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        const json = xhr.response
        const { post } = JSON.parse(json)
        callback(null, post)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('GET', `http://localhost:4000/posts/post/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)

    xhr.send()
}