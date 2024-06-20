
export default function retrieveUser(token, callback) {
    const xhr = new XMLHttpRequest
    xhr.onload = () => {
        const { status } = xhr
        if (status !== 200) {
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))
        }

        const json = xhr.response
        const { user } = JSON.parse(json)

        callback(null, user)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('GET', `http://localhost:4000/users`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)

    xhr.send()
}
