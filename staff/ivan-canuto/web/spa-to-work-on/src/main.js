import { homePage } from './pages/home-page.js'
import { loginPage } from './pages/login-page.js'
import { removeOffClass, context } from './ui.js'
import { renderUser } from './logic/render-user.js'
import { renderPost } from './logic/render-post.js'
import { renderLikesAndFavs } from './logic/render-likes-favs.js'

if(context.userId === undefined) {
  removeOffClass(loginPage)
} else {
  if (renderUser()) {
    if (renderPost()) {
      renderLikesAndFavs()
      removeOffClass(homePage)
    }
  } else {
    removeOffClass(loginPage)
  }
}