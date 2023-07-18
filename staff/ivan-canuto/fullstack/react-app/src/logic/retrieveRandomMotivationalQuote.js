import { errors } from 'com'

/**
 * Retrieves a random motivational quote to show it in login page.
 */

export default function retrireveRandomMotivationalQuote() {
  return fetch('https://api.quotable.io/random', {
    method: 'GET'
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ message, type }) => { throw new errors[type](message) })

    return res.json()
  })
}