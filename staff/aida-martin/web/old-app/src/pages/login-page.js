import authenticateUser from "../logic/authenticate-user.js";
import errorShow from "../logic/helpers/error-managers.js";
import { context, show, hide } from "../ui.js";
import { registerPage, registerForm, registerError } from "./register-page.js";
import { homePage, renderPosts, renderUser } from "./home-page.js";

export const loginPage = document.querySelector(".login");
export const loginForm = loginPage.querySelector(".form");
export const loginError = loginPage.querySelector(".error");

loginForm.onsubmit = function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    context.userId = authenticateUser(email, password);

    renderUser();
    renderPosts();

    loginForm.reset();

    hide(loginError, loginPage);
    show(homePage);
  } catch (error) {
    errorShow(loginError, error);
  }
};

loginPage.querySelector(".register-link").onclick = function () {
  registerForm.reset();

  hide(registerError, loginError, loginPage);
  show(registerPage);
};
