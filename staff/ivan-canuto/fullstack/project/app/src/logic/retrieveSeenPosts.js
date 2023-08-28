import context from "./context"
import { errors } from 'com'

/**
 * Retrieves as much as the last fifteen posts seen by the user
 * 
 * @returns {Promise<array>} The array of posts
*/

export default function retrieveSeenPosts() {
  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/seenPosts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    })

    if(res.status === 200)
      return res.json()
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}