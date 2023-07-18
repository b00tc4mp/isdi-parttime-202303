import context from "./context"
import { errors } from 'com'

/**
 * Retrieves the posts form database. * 
*/

export default function retrievePosts() {
  return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${context.token}`
    },
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ message, type }) => { throw new errors[type](message) })

    return res.json()
  })
}
