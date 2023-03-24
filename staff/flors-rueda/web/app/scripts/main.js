import { changeView, doRegister, doLogin, doLogout, authenticateUser, validateUsername } from './display/login-register.js';
import { toggleOff, setOff, setOn } from './display/general-tools.js'

const register = document.querySelector('.register');
const login = document.querySelector('.login');
const home = document.querySelector('.home');
const profile = document.querySelector('.user-profile');
const editProfile = document.querySelector('.edit-profile');
const changePassword = document.querySelector('.change-password');
const startHome = document.querySelector('.home-start');


// Login & Register

const checkbox = document.querySelector('.mode-checkbox');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const changeViewLinks = document.querySelectorAll('.change-view-link');
const username = document.querySelector('input[name="username"]');

let userAuth;

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


// Home

const logout = document.querySelector('.logout');
const toUserProfile = document.querySelector('.to-user-profile');
const toHome = document.querySelector('.to-home');
const toChangePassword = document.querySelector('.to-change-password');
const toEditProfile = document.querySelector('.to-edit-profile');

logout.addEventListener('click', (event) => {
  event.preventDefault();
  userAuth = false;
  doLogout(login, home);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  setOn(profile);
  setOff(startHome, changePassword, editProfile);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  setOn(startHome);
  setOff(profile, changePassword, editProfile);
});

toChangePassword.addEventListener('click', (event) => {
  event.preventDefault();
  toggleOff(changePassword);
  setOff(startHome, profile, editProfile);
});

toEditProfile.addEventListener('click', (event) => {
  event.preventDefault();
  toggleOff(editProfile);
  setOff(changePassword, startHome, profile);
});