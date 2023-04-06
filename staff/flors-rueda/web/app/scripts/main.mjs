import { changeView, doRegister, doLogin, doLogout, authenticateUser, controlUsernameInput, } from './display/login-register.mjs';
import { setOff, setOn, toggleOff, resetAlerts, setPredeterminateAvatar, clearForms } from './display/general-tools.mjs'
import { setNewPassword, setNewUserInfo, displayProfile, setPlaceHolders, displayWelcome, getAvatarUrl } from './display/home.mjs'
import { displayLoginError, displayRegisterError, displayChangePasswordError, displayEditUserError } from './display/errors.mjs';

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
const deleteAvatar = document.querySelector('.delete-avatar');
const setAvatar = document.querySelector('.set-avatar');


let newAvatar;

//TODO: display users posts at home

logout.addEventListener('click', (event) => {
  event.preventDefault();
  setOff(profile, editProfile, changePassword, profileButtons, startHome, deleteAvatar)
  userAuth = undefined;
  doLogout(login, home);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  newAvatar = undefined;
  clearForms();
  setOn(profile, profileButtons);
  setOff(startHome, changePassword, editProfile);
  toggleOff(deleteAvatar, setAvatar);
  displayProfile(userAuth);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  newAvatar = undefined;
  clearForms();
  resetAlerts();
  setOn(startHome, setAvatar);
  setOff(profile, changePassword, editProfile, profileButtons, deleteAvatar);
  displayWelcome(userAuth)
});

toChangePassword.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setOn(changePassword, setAvatar);
  setOff(startHome, editProfile, profileButtons, deleteAvatar);
});

toEditProfile.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setPlaceHolders(userAuth);
  setOn(editProfile, setAvatar);
  setOff(changePassword, startHome, profileButtons, deleteAvatar);
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
  try {
    const avatar = document.querySelector('.avatar')
    toggleOff(deleteAvatar, setAvatar);
    newAvatar = getAvatarUrl(event, deleteAvatar)
    avatar.src = newAvatar
  } catch (error) {
    
  }
});

deleteAvatar.addEventListener('click', (event) => {
  event.preventDefault();
  newAvatar = undefined;
  temporalAvatar.value = '';
  setPredeterminateAvatar(userAuth);
  toggleOff(deleteAvatar, setAvatar);
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


