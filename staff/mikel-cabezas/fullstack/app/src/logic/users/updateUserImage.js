import { validators } from "com"

const { validateToken } = validators

// export default function uploadImage(token, image, callback) {
export default (token, image) => {
    validateToken(token)


    return fetch(`${import.meta.env.VITE_API_URL}/users/image`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ image })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return res.json()
        })


    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/image`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    const newImage = image.src
    const userData = { newImage }
    debugger
    const json = JSON.stringify(userData)

    xhr.send(json)
}
