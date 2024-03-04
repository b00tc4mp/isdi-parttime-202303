import { validators } from 'com'
const { validateToken, validatePassword, validateCallback } = validators

/**
 * 
 */

export default (token, password, newPassword, newPasswordConfirm, callback) => {
    validateToken(token)
    validatePassword(password, 'password')
    validatePassword(newPassword, 'password')
    validatePassword(newPasswordConfirm, 'password')

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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = {
            password: password,
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm
        }

        const json = JSON.stringify(data)

        xhr.send(json)
        return

    }

    return fetch(`${import.meta.env.VITE_API_URL}/Users/password`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
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

