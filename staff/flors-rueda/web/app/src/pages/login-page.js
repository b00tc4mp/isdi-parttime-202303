import { context, controlUsernameInput, } from '../ui/general-tools.js';
import { changeView, login, } from '../ui/login-register.js';
import { displayWelcome, } from '../ui/home.js'
import { displayLoginError, } from '../ui/errors.js';
import { registerPage } from './register-page.js';
import { postModal, homePage, mainHome } from "./home-page.js";
import initPostsList from '../components/posts-list.js';


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
    context.userAuth = login(loginPage, homePage, mainHome, username, password);
    displayWelcome(context.userAuth);
    initPostsList(context.userAuth, postModal, 'all')
  } catch (error) {
    displayLoginError(error.message);
  }
});