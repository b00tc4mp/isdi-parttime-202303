import { validators } from 'com'

const { validateId, validateText, validateCallback } = validators

export default function setPostPrice(postId, postPrice, callBack) {
  validateId(postId, 'post id')
  validateText(postPrice)
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/postPrice`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const json = JSON.stringify({ postPrice })

  xhr.send(json)
}