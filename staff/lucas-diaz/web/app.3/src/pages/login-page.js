import  authenticateUser  from "../logic/authenticate-user.js";
import { context, show, hide } from "../ui.js";
import { registerPage } from "./register-page.js";
import { homePage, renderPosts, renderUser} from "./home-page.js";
import { footerSite } from "./footer-page.js";

//* VARIABLES DE LOGIN PAGE
export const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login-register-anchor");
//* VARIABLES WARNINGS
const failLogInAdvice = document.querySelector(".login .fail-warning")


logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value
    
    try{
        context.userId = authenticateUser(email, password);

        renderUser();
        renderPosts();

        hide(logInPage);

        
        show(homePage);
        show(footerSite);
        
        failLogInAdvice.textContent = "";
        logInForm.reset();
        
    }catch(error){
        failLogInAdvice.textContent = error.message;
    }
})

loginRegistrationAnchor.onclick = (event) => {
    event.preventDefault();
    hide(logInPage);
    failLogInAdvice.textContent = "";
    show(registerPage);
}

document.querySelector(".forgot-password-anchor").addEventListener("click", (event) => {
    event.preventDefault();
})
