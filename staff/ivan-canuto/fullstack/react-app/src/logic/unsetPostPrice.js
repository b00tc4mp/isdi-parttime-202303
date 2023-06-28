import { validators } from 'com'

const { validateId, validateCallback } = validators

export default function unsetPostPrice(postId, callBack) {
  console.log(postId)
  validateId(postId, 'post id')
  validateCallback(callBack)
  
  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const { status } = xhr

    if(status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callBack(new Error(error))

      return
    }

    callBack(null)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/notOnSalePost`)

  xhr.send()
}