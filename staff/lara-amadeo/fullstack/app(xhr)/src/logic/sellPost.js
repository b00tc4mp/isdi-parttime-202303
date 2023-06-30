
export default function sellPost(token, postId, actualPrice, newPrice, callback) {

    if (actualPrice === newPrice) {
        callback(new Error('Price should be different to previous one'))

        return
    }

    if (newPrice < 0) {
        callback(new Error('Price must be higher than 0'))

        return
    }

    if (newPrice > 1000) {
        callback(new Error('Price must be lower than 1000'))

        return
    }

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

    xhr.open('PATCH', `http://localhost:4000/posts/price/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)

    const price = { newPrice }
    const json = JSON.stringify(price)
    xhr.send(json)

}