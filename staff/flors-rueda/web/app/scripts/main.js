import { doRegister, doLogin, doLogout, authenticateUser, validateUsername } from './display/login-register.js';
import { changeView, } from './display/general-tools.js'

const register = document.querySelector('.register');
const login = document.querySelector('.login');
const home = document.querySelector('.home');

const checkbox = document.querySelector('.mode-checkbox');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const changeViewLinks = document.querySelectorAll('.change-view-link');
const username = document.querySelector('input[name="username"]');

const logout = document.querySelector('.logout');

let userAuth;

// Login & Register

username.addEventListener('input', (event) => {
  validateUsername(username);
});

checkbox.addEventListener('change', (event) => {
  event.preventDefault();
  document.body.classList.toggle('dark-mode');
});

changeViewLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    changeView(register, login);
  });
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  doRegister(register, login);
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const mail = document.querySelector('.login-form').querySelector('input[name="mail"]').value.toLowerCase();
  const password = document.querySelector('.login-form').querySelector('input[name="password"]').value;
  authenticateUser(mail, password) ? userAuth = true : userAuth = false;
  if(userAuth) doLogin(login, home);
});

/*
logout.addEventListener('click', (event) => {
  event.preventDefault();
  userAuth = false;
  doLogout(login, home);
});
*/
