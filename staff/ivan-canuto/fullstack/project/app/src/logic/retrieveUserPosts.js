import context from './context'
import { errors } from 'com'

/**
 * Retrieves the user's posts form database.
*/

export default function retrieveUserPosts() {
  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/userPosts`, {
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