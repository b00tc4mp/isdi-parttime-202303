

export default function togglePostVisibility(userId, postId, callback){

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

    xhr.open('PATCH', `http://localhost:4000/posts/visibility/${postId}/users/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send()
}