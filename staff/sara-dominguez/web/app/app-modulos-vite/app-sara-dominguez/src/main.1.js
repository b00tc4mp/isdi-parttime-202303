console.log('load main')

import { context, show, hide } from './ui.js'
import { loginPage } from './pages/login-page.js'
import { homePage, renderUser, renderPosts } from './pages/home-page.js'

if(context.userId === undefined) {
    show(loginPage)
}else{
    if(renderUser()){
        if(renderPosts()){
            
            show(homePage)
        }
    }else{
        show(loginPage)
    }
}
