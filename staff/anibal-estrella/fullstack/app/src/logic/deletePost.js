import { validators } from 'com'
const { validateToken, validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Updates 
 * @param {*} token 
 * @param {*} postId 
 * @param {*} image 
 * @param {*} text 
 * */

export default (token, postId, image, text, callback) => {
    validateToken(token)
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'text')

    if (callback) {

        validateCallback(callback, 'callback function')

        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 201) {
                const { response: json } = xhr
                const { error } = JSON.parse(json)

                callback(new Error(error))

                return
            }
            callback(null)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/post/${postId}`)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = { image, text }
        const json = JSON.stringify(data)

        xhr.send(json)

        return
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts/post/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image, text }),
    }).then((res) => {
        // 201 from api or 204?
        if (res.status !== 201) {
            //return the json object
            return res.json().then(({ error: message }) => {
                throw new Error(message)
            })
        }
    })

}

