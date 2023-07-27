import { errors } from '../../../project/com'

/**
 * Retrieves a random motivational quote to show it in login page.
 */

export default function retrireveRandomMotivationalQuote() {
  return (async () => {
    const res = await fetch('https://api.quotable.io/random', {
      method: 'GET'
    })

    if(res.status === 200)
      return res.json()

    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()

  // return fetch('https://api.quotable.io/random', {
  //   method: 'GET'
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })

  //   return res.json()
  // })
}