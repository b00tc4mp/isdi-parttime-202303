import { context } from "./context"
import errors from './helpers/errors'

type Params = {
    images: Array<string | undefined>
    title: string,
    description: string,
    ingredients: Array<string>,
    categories: Array<string>,
    bestBefore: string,
    price: string
}

export default function createMeal({ images, title, description, ingredients, bestBefore, price, categories }: Params) {
    const meal = { images, title, description, ingredients, bestBefore, price, categories }
    return (async () => {
        const res = await fetch('http://localhost:1234/meals', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(meal)
        })

        if (res.status === 201) return

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
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(meal)
    })
        .then(res => {
            if (res.status !== 200) res.json().then(({ error }) => { throw new Error(error.message) })
        })
*/