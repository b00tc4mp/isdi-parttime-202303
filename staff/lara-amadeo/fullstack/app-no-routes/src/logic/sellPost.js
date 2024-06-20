
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

    const price = { newPrice }

    return fetch(`http://localhost:4000/posts/price/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(price)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
        })

}