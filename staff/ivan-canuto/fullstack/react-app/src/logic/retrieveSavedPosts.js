import context from "./context"
import { errors } from 'com'

/**
 * Retrieves the saved posts form database.
*/

export default function retrieveSavedPosts() {
  return fetch(`${import.meta.env.VITE_API_URL}/users/savedPosts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${context.token}`
    }
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ message, type }) => { throw new errors[type](message) })

    return res.json()
  })
}