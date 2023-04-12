import  authenticateUser  from "../logic/authenticate-user.js";
import  addUserNameInHeader  from "../logic/add-username-in-header.js";
import  setExistingAvatar  from "../logic/set-existing-avatar.js";
import { context, show, hide } from "../ui.js";
import { registerPage } from "./register-page.js";
import { homePage, DEFAUTL_AVATAR_URL, avatarImage, renderPosts} from "./home-page.js";
import { footerSite } from "./footer-page.js";

//* VARIABLES DE LOGIN PAGE
export const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login-register-anchor");
//* VARIABLES WARNINGS
const failLogInAdvice = document.querySelector(".login .fail-warning")

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = event.target.email.value = "lucas@gmail.com"
    const password = event.target.password.value = "LucasDiaz22!"
    
    try{
        context.userId = authenticateUser(email, password);
        addUserNameInHeader(context.userId, context.welcomeMessage, avatarImage);
        hide(logInPage);
        failLogInAdvice.textContent = "";
        setExistingAvatar(context.userId, DEFAUTL_AVATAR_URL, avatarImage);

        //TODO ORDER AND PAINT POSTS 
        //lo metemos en homepage porque es un tema interno de homepage
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
