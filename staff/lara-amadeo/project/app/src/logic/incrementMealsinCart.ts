import { context } from "./context"
import errors from "./helpers/errors"

export default function incrementMealsInCart(mealId: string, quantity: number) {

    return (async () => {
        const res = await fetch(`http://localhost:1234/meals/cart/increment/${mealId}`, {
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