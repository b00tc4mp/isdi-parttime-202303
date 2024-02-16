import { validators } from 'com'
const { validateToken, validateEmail, validateCallback, validateName, validateNickName, validatePassword } = validators

/**
 * 
 */

export default (token, name, nickName, newEmail, newEmailConfirm, password, callback) => {
    validateToken(token)
    validateEmail(newEmail, 'Email')
    validateEmail(newEmailConfirm, 'Email')
    validateName(name, 'name')
    validateNickName(nickName, 'nickname')
    validatePassword(password, 'password')

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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/user-update-profile/`)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = {
            name: name,
            nickName: nickName,
            newEmail: newEmail,
            newEmailConfirm: newEmailConfirm,
            password: password
        }

        const json = JSON.stringify(data)

        xhr.send(json)
        return
    }

    return fetch(`${import.meta.env.VITE_API_URL}/Users/user-update-profile/`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Email }),
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

