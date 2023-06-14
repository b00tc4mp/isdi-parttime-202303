/**
 * Creates a post with the params given
 * @param {string} userId user's id
 * @param {url} image post's image url
 * @param {string} text post's caption
 * 
 */

export default function createPost(userId, image, text, callback) {

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if(status !== 201){
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

    xhr.open('POST', `http://localhost:4000/posts/new`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    const data = { image, text }
    const json = JSON.stringify(data)

    xhr.send(json)

}