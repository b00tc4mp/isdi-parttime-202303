console.log('load main')

import { homePage, renderPosts, renderUsers } from "./pages/home-page.js"
import { loginPage } from "./pages/login-page.js"
import { context, hideElement, showElement } from "./ui.js"

if(!context.userId) {
    showElement(loginPage)
} else {
    if(renderUsers()){
        if(renderPosts()){
            showElement(homePage)
            hideElement(loginPage)
        }
    } else {
        showElement(loginPage)
        hideElement(homePage)
    }

}

