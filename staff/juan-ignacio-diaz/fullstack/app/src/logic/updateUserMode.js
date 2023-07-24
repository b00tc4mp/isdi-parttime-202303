import context from "./context"

export default async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/updateMode`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ mode })
    })

    if (res.status === 204)
        return

    const { error: message } = await res.json()

    throw new Error(message)
}