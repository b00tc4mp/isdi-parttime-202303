import { changeView, doRegister, doLogin, doLogout, authenticateUser, controlUsernameInput, } from './display/login-register.js';
import { setOff, setOn, resetAlerts, setPredeterminateAvatar } from './display/general-tools.js'
import { setNewPassword, setNewUserInfo, displayProfile, setPlaceHolders, displayWelcome, getAvatarUrl } from './display/home.js'
import { displayLoginError, displayRegisterError, displayChangePasswordError, displayEditUserError } from './display/errors.js';

const register = document.querySelector('.register');
const login = document.querySelector('.login');
const home = document.querySelector('.home');
const profile = document.querySelector('.user-profile');
const editProfile = document.querySelector('.edit-profile');
const changePassword = document.querySelector('.change-password');
const startHome = document.querySelector('.home-start');
const profileButtons = document.querySelector('.profile-buttons');


// Login & Register

const checkbox = document.querySelector('.mode-checkbox');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const changeViewLinks = document.querySelectorAll('.change-view-link');
const usernameRegister = document.querySelector('.register-form').querySelector('input[name="username"]');
const usernameLogin = document.querySelector('.login-form').querySelector('input[name="username"]');

let userAuth;

usernameRegister.addEventListener('input', (event) => {
  controlUsernameInput(usernameRegister);
});

usernameLogin.addEventListener('input', (event) => {
  controlUsernameInput(usernameLogin);
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
  try {
    doRegister(register, login);
  } catch (error) {
    displayRegisterError(error.message);
  }
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('.login-form').querySelector('input[name="username"]').value;
  const password = document.querySelector('.login-form').querySelector('input[name="password"]').value;
  try {
    userAuth = authenticateUser(username, password);
    doLogin(login, home, startHome);
    displayWelcome(userAuth)
  } catch (error) {
    displayLoginError(error.message);
  }
});


// Home

const logout = document.querySelector('.logout');
const toUserProfile = document.querySelector('.to-user-profile');
const toHome = document.querySelector('.to-home');
const toChangePassword = document.querySelector('.to-change-password');
const toEditProfile = document.querySelector('.to-edit-profile');
const passwordForm = document.querySelector('.password-form');
const editForm = document.querySelector('.edit-form');
const temporalAvatar = document.querySelector('.edit-form').querySelector('input[type="file"]');
const deleteAvatar = document.querySelector('[name="delete-avatar"]');


let newAvatar;

//TODO: display users posts at home

logout.addEventListener('click', (event) => {
  event.preventDefault();
  setOff(profile, editProfile, changePassword, profileButtons, startHome)
  userAuth = undefined;
  doLogout(login, home);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  setOn(profile, profileButtons);
  setOff(startHome, changePassword, editProfile);
  displayProfile(userAuth);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  resetAlerts();
  setOn(startHome);
  setOff(profile, changePassword, editProfile, profileButtons);
  displayWelcome(userAuth)
});

toChangePassword.addEventListener('click', (event) => {
  event.preventDefault();
  setOn(changePassword);
  setOff(startHome, editProfile, profileButtons);
});

toEditProfile.addEventListener('click', (event) => {
  event.preventDefault();
  setPlaceHolders(userAuth)
  setOn(editProfile);
  setOff(changePassword, startHome, profileButtons);
});

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    setNewPassword(userAuth, profileButtons, changePassword);
    displayProfile(userAuth);
  } catch (error) {
    displayChangePasswordError(error.message);
  }
});

temporalAvatar.addEventListener('change', (event) => {
  const avatar = document.querySelector('.avatar')
  newAvatar = getAvatarUrl(event, deleteAvatar)
  avatar.src = newAvatar
});

deleteAvatar.addEventListener('click', (event) => {
  event.preventDefault();
  newAvatar = undefined;
  temporalAvatar.value = '';
  setPredeterminateAvatar(userAuth);
  setOff(deleteAvatar);
  displayProfile(userAuth);
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    setNewUserInfo(userAuth, profileButtons, editProfile, newAvatar);
    displayProfile(userAuth);
  } catch (error) {
    displayEditUserError(error.message);
  }
});


