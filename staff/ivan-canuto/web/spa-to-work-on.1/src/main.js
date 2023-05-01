import { homePage } from './pages/home-page.js'
import { loginPage } from './pages/login-page.js'
import { removeOffClass, context } from './ui.js'
import { renderUser } from './logic/render-user.js'
import { renderPosts } from './logic/render-posts.js'
import { renderLikesAndFavs } from './logic/render-likes-favs.js'

if(context.userId === undefined) {
  removeOffClass(loginPage)
} else {
  if (renderUser()) {
    if (renderPosts()) {
      renderLikesAndFavs()
      removeOffClass(homePage)
    }
  } else {
    removeOffClass(loginPage)
  }
}