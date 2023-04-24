/*import { context, controlUsernameInput, } from '../ui/general-tools.js';
import { changeView, } from '../ui/login-register.js';
import { displayWelcome, } from '../ui/home.js'
import { displayLoginError, } from '../ui/errors.js';
import { registerPage } from './register-page.js';
import { postModal, homePage, mainHome } from "./home-page.js";
import initPostsList from '../components/posts-list.js';*/

import initRegisterForm from '../components/register-form.js';
import { changeView } from '../ui/login.js';

export const loginPage = document.querySelector('.login-page');
export const register = document.querySelector('.login-page__register');
export const login = document.querySelector('.login-page__login');

const changeViewLink = document.querySelector('.login-page__change-view--link');

changeViewLink.addEventListener('click', (event) => {
  event.preventDefault();
  changeView(changeViewLink, login, register)
});

initRegisterForm(changeViewLink, register, login);




/*
const loginForm = document.querySelector('.login-form');
const usernameLogin = document.querySelector('.login-form').querySelector('input[name="username"]');
export const changeViewLinks = document.querySelectorAll('.change-view-link');

usernameLogin.addEventListener('input', (event) => {
  controlUsernameInput(usernameLogin);
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
*/