import { context } from "./context"

export default function retrieveMeals() {

    return (async () => {
        const res = await fetch('http://localhost:1234/meals', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            }
        })
        if (res.status === 200) {
            const meals = await res.json()

            return meals
        }

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)
    })()
}

/*
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
*/