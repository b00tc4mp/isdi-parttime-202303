import { show } from '../../ui.js'

export default function errorShow (page, error) {
  if (error.cause === 'userError') {
    show(page)
    page.innerText = error.message
    return
  }
  console.log(error)
}
