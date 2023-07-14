import context from "./context"

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
      return res.json().then(({ error: message }) => { throw new Error(message) })

    return res.json()
  })
}