const { validateId, validateCallBack } = require('com')

/**
 * Remove post from sale state.
 * 
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function removePostFromSale(postId, callBack) {
  validateId(postId)
  validateCallBack(callBack)

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
    callBack(new Error('Connection error'))
  }

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/removePostFromSale/${postId}`)

  xhr.send()
}