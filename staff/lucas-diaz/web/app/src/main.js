import './pages/login-page.js'
import { logInPage } from './pages/login-page.js'
import { homePage, renderPosts, renderUser } from './pages/home-page.js'
import { context, hide, show } from './ui.js'
import { footerSite } from './pages/footer-page.js';


if (context.userId === undefined) {
    show(logInPage);
}
else {
    if(renderUser()){
        if(renderPosts()){
            hide(logInPage);
            show(homePage);
            show(footerSite);
        }
    }else 
        show(logInPage);
}
