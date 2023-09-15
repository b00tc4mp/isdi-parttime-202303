import context from "./context"
import { errors } from 'com'

/**
 * Retrieves the name, avatar, and favorite posts of the user.
 */

export default () => {
  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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

  // return fetch(`${import.meta.env.VITE_API_URL}/users`, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${context.token}`
  //   }
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })

  //   return res.json()
  // })
}