import context from './context'

export default () =>
    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(message)
                })
        })