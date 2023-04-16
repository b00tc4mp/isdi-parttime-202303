import { homePage, loginPage } from './pages/home-page.js'
import { removeOffClass, context } from './ui.js'
import { renderUser } from './logic/render-user.js'
import { renderPost } from './logic/render-post.js'

if(context.userId === undefined) {
  removeOffClass(loginPage)
} else {
  if (renderUser()) {
    if (renderPost()) {
      removeOffClass(homePage)
    }
  } else {
    removeOffClass(loginPage)
  }
}