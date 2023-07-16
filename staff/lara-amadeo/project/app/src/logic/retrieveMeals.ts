import { context } from "./context"

export default function retrieveMeals() {
    return fetch('http://localhost:1234/meals', {
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