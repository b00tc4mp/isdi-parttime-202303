console.log('load main')

import { loginPage } from "./pages/login-page.mjs"
import { homePage, renderUser, renderPosts} from "./pages/home-page.mjs"
import { context, show, hide } from "./ui.mjs"

if (context.userId === undefined) {
    show(loginPage)

} else {
    if (renderUser()) {
        if (renderPosts()) 
            show(homePage) 

    } else 
        show(loginPage)
}

