import context from './context'

export default () => {
    return fetch(`${import.meta.env.VITE_API_UEL}/employees`, {
        headers: {
            authorization: `Bearer ${context.token}`
        }

    })

        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.message)
                })
        })
}