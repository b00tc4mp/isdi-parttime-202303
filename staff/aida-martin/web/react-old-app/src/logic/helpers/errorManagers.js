import { show } from '../../ui'

export default function errorShow (page, error) {
  if (error.cause === 'userError') {
    show(page)
    page.innerText = error.message
    return
  }
  console.log(error)
}
