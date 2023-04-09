import { context, controlUsernameInput, } from '../ui/general-tools.mjs';
import { changeView, login, } from '../ui/login-register.mjs';
import { displayWelcome, } from '../ui/home.mjs'
import { displayLoginError, } from '../ui/errors.mjs';
import { registerPage } from './register-page.mjs';
import { homePage, startHome } from "./home-page.mjs";

export const loginPage = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const usernameLogin = document.querySelector('.login-form').querySelector('input[name="username"]');
export const changeViewLinks = document.querySelectorAll('.change-view-link');

usernameLogin.addEventListener('input', (event) => {
  controlUsernameInput(usernameLogin);
});

changeViewLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    changeView(registerPage, loginPage);
  });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('.login-form').querySelector('input[name="username"]').value;
  const password = document.querySelector('.login-form').querySelector('input[name="password"]').value;
  try {
    context.userAuth = login(context.userAuth, loginPage, homePage, startHome, username, password);
    displayWelcome(context.userAuth)
  } catch (error) {
    displayLoginError(error.message);
  }
});