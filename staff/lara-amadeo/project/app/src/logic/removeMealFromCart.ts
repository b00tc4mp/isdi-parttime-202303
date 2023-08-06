import { context } from "./context"
import errors from "./helpers/errors"

export default function removeMealFromCart(mealId: string) {
    (async () => {
        const res = await fetch(`http://localhost:1234/meals/cart/delete/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 204) return

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)
    })()
}