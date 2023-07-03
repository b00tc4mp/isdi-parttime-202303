import { validators } from 'com'

const {
  validateId,
  validateToken,
  validateUrl,
  validateText,
  validateCallback,
} = validators

export default function updatePost(token, postId, image, text, callback) {
  validateToken(token)
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')

  if (callback) {
    validateCallback(callback)

    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      const { status } = xhr

      if (status !== 204) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)

        callback(new Error(error))

        return
      }

      callback(null)
    }

    xhr.onerror = () => {
      callback(new Error('Connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const data = { image, text }
    const json = JSON.stringify(data)

    xhr.send(json)

    return
  }

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image, text }),
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ error: message }) => {
        throw new Error(message)
      })
  })
}
