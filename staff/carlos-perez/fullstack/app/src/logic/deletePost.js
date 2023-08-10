export default function deletePost(userId, postId, callback) {

    const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 200) {
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

  xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}