import  authenticateUser  from "../logic/authenticate-user.js";
import { context, show, hide } from "../ui.js";
import { registerPage } from "./register-page.js";
import { homePage, DEFAUTL_AVATAR_URL, avatarImage, renderPosts, renderUser} from "./home-page.js";
import { footerSite } from "./footer-page.js";

//* VARIABLES DE LOGIN PAGE
export const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login-register-anchor");
//* VARIABLES WARNINGS
const failLogInAdvice = document.querySelector(".login .fail-warning")
const welcomeMessage = document.querySelector(".home-header-user-welcome-msj")

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = event.target.email.value = "lucas@gmail.com"
    const password = event.target.password.value = "LucasDiaz22!"
    
    try{
        context.userId = authenticateUser(email, password);
        renderUser(context.userId,welcomeMessage, DEFAUTL_AVATAR_URL, avatarImage);
        hide(logInPage);
        failLogInAdvice.textContent = "";
        renderPosts();
        show(homePage);
        show(footerSite);
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
