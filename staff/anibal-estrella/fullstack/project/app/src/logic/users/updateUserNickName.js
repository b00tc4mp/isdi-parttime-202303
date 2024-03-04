import { validators } from 'com'
const { validateToken, validateNickName, validateCallback } = validators

/**
 * 
 */

export default (token, newUserNickName, callback) => {
    validateToken(token)
    validateNickName(newUserNickName, 'userNickName')

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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/user-nickname`)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = {
            nickName: newUserNickName,
        }

        const json = JSON.stringify(data)

        xhr.send(json)
        return

    }

    return fetch(`${import.meta.env.VITE_API_URL}/Users/Email`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUserNickName }),
    }).then((res) => {
        if (res.status !== 201) {
            //return the json object
            return res.json().then(({ error: message }) => {
                throw new Error(message)
                    .then(() => { })
            })
        }
    })
        .then(() => { })

}

