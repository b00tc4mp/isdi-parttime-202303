

/**
 * Toggles the like or unlike for a post
 * @param {object} post A post object
 * @param {string} token user's id
 */

export default function toggleLikePost(postId, token, callback) {

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if (status !== 201) {
            const json = xhr.response
            const { error } = JSON.parse(json)
            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('PATCH', `http://localhost:4000/posts/like/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)

    xhr.send()

}


