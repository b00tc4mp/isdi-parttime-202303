import { context } from "./context"

export default function retrieveUser() {
    return fetch('http://localhost:1234/users', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status !== 200) res.json().then(({ error }) => { throw new Error(error.message) })

            return res.json()
        })
}