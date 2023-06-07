import { validators } from 'com'

const { validateCallback } = validators

/**
 * Retrieves a random motivational quote to show it in login page.
 * 
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function retrireveRandomMotivationalQuote(callBack) {
  validateCallback(callBack)

  const xmr = new XMLHttpRequest
  
  xmr.onload = () => {
    const { content } = JSON.parse(xmr.response)

    callBack(null, content)
  }

  xmr.onerror = () => {
    callBack(new Error('connection error'))
  }

  xmr.open('GET', 'https://api.quotable.io/random')
  xmr.send()
}