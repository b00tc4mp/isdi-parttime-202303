import context from "./context"

export default function retrieveConversations() {
    validateText(userInput)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversation`, {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)
    })()
}