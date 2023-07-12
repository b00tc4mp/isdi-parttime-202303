import context from "./context"

export default (mode) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/updateMode`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ mode })
    })
        .then(res => {
            if (res.status === 204)
                return

            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}