
export default function retrieveUser(userId, callback) {

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if(status !== 200){
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

    xhr.open('GET', `http://localhost:4000/users/${userId}`)

    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify(userId)

    xhr.send(json)
}
