
import { context } from "./context"

export default function retrieveWaitingToPickUp() {

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/waiting/pickUp`, {
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
