import { validateCallback } from './helpers/validators'

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