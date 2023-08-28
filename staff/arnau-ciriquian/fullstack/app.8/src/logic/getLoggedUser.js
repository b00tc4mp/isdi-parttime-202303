import context from "./context"

export function getLoggedUser() {
    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${context.token}`
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