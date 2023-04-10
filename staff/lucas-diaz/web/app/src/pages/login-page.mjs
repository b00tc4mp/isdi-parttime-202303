import  authenticateUser  from "../logic/authenticate-user.mjs";
import  addUserNameInHeader  from "../logic/add-username-in-header.mjs";
import  setExistingAvatar  from "../logic/set-existing-avatar.mjs";
import { context, show, hide } from "../ui.mjs";
import { registerPage } from "./register-page.mjs";
import { homePage, DEFAUTL_AVATAR_URL, avatarImage} from "./home-page.mjs";
import { footerSite } from "./footer-page.mjs";

//* VARIABLES DE LOGIN PAGE
export const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login-register-anchor");
//* VARIABLES WARNINGS
const failLogInAdvice = document.querySelector(".login .fail-warning")

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value = "LucasDiaz22!";   //! OJO ELIMINAR ESTO
    
    try{
        context.userId = authenticateUser(email, password);
        addUserNameInHeader(context.userId, context.welcomeMessage, avatarImage);
        hide(logInPage);
        failLogInAdvice.textContent = "";
        setExistingAvatar(context.userId, DEFAUTL_AVATAR_URL, avatarImage);
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
