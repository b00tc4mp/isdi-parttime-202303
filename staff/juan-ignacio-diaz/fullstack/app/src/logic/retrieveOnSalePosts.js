import context from "./context"

export default async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/retrieveOnSalePosts`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })

    if (res.status === 200)
            return await res.json()
        
    const { error: message } = await res.json()

    throw new Error(message) 
}