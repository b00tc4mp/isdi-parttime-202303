import  registerUser  from "../logic/register-user.js";
import { vanishWarningIn3Seconds } from "../logic/helpers/data-managers.js";

import { show, hide } from "../ui.js";
import { logInPage } from "./login-page.js";

//*VARIABLES DE REGISTER
export const registerPage = document.querySelector(".register");
const registerForm = document.querySelector(".register form")
//* VARIABLES WARNINGS
const successRegisterAdivice = document.querySelector(".login-success-warning");
const failRegisterAdvice = document.querySelector(".register .fail-warning");

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const temporalUserName = event.target.name.value;
    const temporalEmail = event.target.email.value;
    const temporalPassword = event.target.password.value;
    try{
        registerUser(temporalUserName, temporalEmail, temporalPassword);
        hide(registerPage);
        show(logInPage);
        show(successRegisterAdivice)
        vanishWarningIn3Seconds(successRegisterAdivice, "off")
        registerForm.reset();
    } catch (error){
        failRegisterAdvice.textContent = error.message;
    }
})
