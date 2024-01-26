import { validators } from 'com'
import context from './context'

const { validateCallback } = validators

export default function retrieveUser(callback) {
  if (callback) {
    validateCallback(callback)

    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      const { status } = xhr

      if (status !== 200) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)

        callback(new Error(error))

        return
      }

      const { response: json } = xhr
      const user = JSON.parse(json)

      callback(null, user)
    }

    xhr.onerror = () => {
      callback(new Error('Connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

    return
  }

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    })

    if (res.status === 200) return await res.json()

    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}