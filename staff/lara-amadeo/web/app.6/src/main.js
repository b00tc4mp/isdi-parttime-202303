import { showPosts } from "./logic/showPosts.js"
import { feed, homePage, renderUser } from "./pages/home-page.js"
import { loginPage } from "./pages/login-page.js"
import { context, hide, show } from "./ui.js"

// if(context.userId === undefined){
//     hide(homePage)
//     show(loginPage)
// } else {
//     renderUser()
//     showPosts()
//     show(homePage, feed)
// }

show(loginPage)