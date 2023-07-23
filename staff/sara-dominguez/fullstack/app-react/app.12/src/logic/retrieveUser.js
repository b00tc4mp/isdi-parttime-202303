import context from './context'


export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        // method: 'GET',
        headers: {
            authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.error)
                })
        })
}

