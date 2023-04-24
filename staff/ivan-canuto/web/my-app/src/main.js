import { loginPage } from "./pages/login-page.js";
import { homePage } from "./pages/home-page.js";
import { removeOffClass, context } from "./ui.js";
import { renderUser } from "./logic/render-user.js";
import { renderPosts } from "./logic/render-posts.js";

if(context.userId === undefined) {
  removeOffClass(loginPage)
} else {
  if(renderUser()) {
    if(renderPosts()) {
      // renderLikesAndFavs()
      removeOffClass(homePage)
    }
  } else ( removeOffClass(loginPage))
}