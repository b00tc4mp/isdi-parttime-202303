import { context } from "../ui/general-tools.mjs";
import { changeView, doLogin, authenticateUser, controlUsernameInput, } from '../ui/login-register.mjs';
import { displayWelcome, } from '../ui/home.mjs'
import { displayLoginError, } from '../ui/errors.mjs';
import { register } from "./register-page.mjs";
import { home, startHome } from "./home-page.mjs";

export const login = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const usernameLogin = document.querySelector('.login-form').querySelector('input[name="username"]');
export const changeViewLinks = document.querySelectorAll('.change-view-link');

usernameLogin.addEventListener('input', (event) => {
  controlUsernameInput(usernameLogin);
});

changeViewLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      changeView(register, login);
    });
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.querySelector('.login-form').querySelector('input[name="username"]').value;
    const password = document.querySelector('.login-form').querySelector('input[name="password"]').value;
    try {
      context.userAuth = authenticateUser(username, password);
      doLogin(login, home, startHome);
      displayWelcome(context.userAuth)
    } catch (error) {
      displayLoginError(error.message);
    }
  });