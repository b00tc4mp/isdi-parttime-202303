import { context } from '../display/general-tools.mjs';
import { login } from './login-page.mjs';
import { doLogout, } from '../display/login-register.mjs';
import { setOff, setOn, toggleOff, resetAlerts, setPredeterminateAvatar, clearForms } from '../display/general-tools.mjs'
import { setNewPassword, setNewUserInfo, displayProfile, setPlaceHolders, displayWelcome, getAvatarUrl } from '../display/home.mjs'
import { displayChangePasswordError, displayEditUserError } from '../ui/errors.mjs';

export const home = document.querySelector('.home');
export const startHome = document.querySelector('.home-start');
const profile = document.querySelector('.user-profile');
const editProfile = document.querySelector('.edit-profile');
const changePassword = document.querySelector('.change-password');
const profileButtons = document.querySelector('.profile-buttons');

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
  context.userAuth = undefined;
  doLogout(login, home);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  newAvatar = undefined;
  clearForms();
  setOn(profile, profileButtons);
  setOff(startHome, changePassword, editProfile);
  toggleOff(deleteAvatar, setAvatar);
  displayProfile(context.userAuth);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  newAvatar = undefined;
  clearForms();
  resetAlerts();
  setOn(startHome, setAvatar);
  setOff(profile, changePassword, editProfile, profileButtons, deleteAvatar);
  displayWelcome(context.userAuth)
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
    setNewPassword(context.userAuth, profileButtons, changePassword);
    displayProfile(context.userAuth);
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
  setPredeterminateAvatar(context.userAuth);
  toggleOff(deleteAvatar, setAvatar);
  displayProfile(context.userAuth);
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    setNewUserInfo(context.userAuth, profileButtons, editProfile, newAvatar);
    displayProfile(context.userAuth);
  } catch (error) {
    displayEditUserError(error.message);
  }
});