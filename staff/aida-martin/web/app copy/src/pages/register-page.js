import { loginForm, loginPage } from "./login-page.js";
import registerUser from "../logic/register-user.js";
import errorShow from "../logic/helpers/error-managers.js";
import { show, hide } from "../ui.js";

export const registerPage = document.querySelector(".register");
export const registerForm = registerPage.querySelector(".form");
export const registerError = registerPage.querySelector(".error");

registerForm.onsubmit = function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  const repeatPassword = event.target.repeatpassword.value;

  try {
    registerUser(name, email, password, repeatPassword);

    hide(registerPage);
    show(loginPage);
  } catch (error) {
    errorShow(registerError, error);
  }
};

registerPage.querySelector("a").onclick = function () {
  loginForm.reset();

  hide(registerPage);
  show(loginPage);
};
