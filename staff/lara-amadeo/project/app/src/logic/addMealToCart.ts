import { context } from "./context"
import errors from "./helpers/errors"

export default function addMealToCart(mealId: string, quantity: number) {
    (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/cart/${mealId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ quantity })
        })

        if (res.status === 204) return

        //@ts-ignore
        const { message, type } = await res.json()
        throw message

        // //@ts-ignore
        // const clazz = errors[type]

        // //@ts-ignore
        // throw new clazz(message)
    })()
}