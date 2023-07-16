import { context } from "./context"

export const loginUser = (email: string, password: string) => {
    const user = { email, password }
    return fetch('http://localhost:1234/users/auth', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
        .then(token => {
            context.token = token
        })
}
