import { context } from "./context"
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
}