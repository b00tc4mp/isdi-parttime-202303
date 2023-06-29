import { validators } from 'com'

const { validateCallback } = validators

/**
 * Retrieves a random motivational quote to show it in login page.
 * 
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function retrireveRandomMotivationalQuote(callBack) {
  if(callBack) {
    validateCallback(callBack)

    const xhr = new XMLHttpRequest
    
    xhr.onload = () => {
      const { content } = JSON.parse(xhr.response)

      callBack(null, content)
    }

    xhr.onerror = () => {
      callBack(new Error('connection error'))
    }

    xhr.open('GET', 'https://api.quotable.io/random')
    
    xhr.send()

  } else {
    return fetch('https://api.quotable.io/random', {
      method: 'GET'
    })
    .then(res => {
      if(res.status !== 200)
        res.json().then(({ error: message }) => { throw new Error(message) })

      return res.json()
    })
  }
}