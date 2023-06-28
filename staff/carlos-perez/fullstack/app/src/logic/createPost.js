export function createPost(userId, image, text, callback) {
const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 201) {
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

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  const post = { image, text }
  const json = JSON.stringify(post)

  xhr.send(json)
}