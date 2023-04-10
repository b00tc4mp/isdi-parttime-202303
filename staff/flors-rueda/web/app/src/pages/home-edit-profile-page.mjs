import { context, controlUsernameInput,  } from '../ui/general-tools.mjs';
import { setOff, setOn, toggleOff, resetAlerts, setPredeterminateAvatar, clearForms, getImgUrl } from '../ui/general-tools.mjs'
import { setNewPassword, setNewUserInfo, displayProfile, setPlaceHolders, setNewMail, deleteUser, setAlertUserDeleted, cleanNewAvatarInput } from '../ui/home.mjs'
import { displayEditUserError } from '../ui/errors.mjs';
import { startHome, homePage, profileForms } from './home-page.mjs';
import { logout, } from '../ui/login-register.mjs';
import { loginPage } from './login-page.mjs';

export const profile = document.querySelector('.user-profile');
export const profileButtons = document.querySelector('.profile-buttons');

const toEditProfile = document.querySelector('.to-edit-profile');
const editProfile = document.querySelector('.edit-profile');
const editForm = document.querySelector('.edit-form');
const editUsername = document.querySelector('.edit-form').querySelector('input[name="username"]');
const temporalAvatar = document.querySelector('.edit-form').querySelector('input[type="file"]');
const deleteAvatar = document.querySelector('.edit-avatar').querySelector('.delete-img');
const setAvatar = document.querySelector('.set-avatar');

const toChangePassword = document.querySelector('.to-change-password');
const changePassword = document.querySelector('.change-password');
const passwordForm = document.querySelector('.password-form');

const toEditMail = document.querySelector('.to-edit-mail');
const editMail = document.querySelector('.edit-mail');
const mailForm = document.querySelector('.mail-form');

const toDeleteAccount = document.querySelector('.to-delete-account');
const deleteAccount = document.querySelector('.delete-account');
const deleteForm = document.querySelector('.delete-form');

export let newAvatar;

toEditProfile.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setPlaceHolders(context.userAuth);
  setOn(editProfile, setAvatar, profileForms);
  setOff(startHome, profileButtons, changePassword, editMail, deleteAccount);
});

editUsername.addEventListener('input', (event) => {
  controlUsernameInput(editUsername);
});

temporalAvatar.addEventListener('change', (event) => {
  try {
    const avatar = document.querySelector('.avatar');
    toggleOff(deleteAvatar, setAvatar);
    newAvatar = getImgUrl(event);
    avatar.src = newAvatar;
  } catch (error) {}
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
    setNewUserInfo(context.userAuth, profileButtons, newAvatar);
    displayProfile(context.userAuth);
    setOff(deleteAvatar, setAvatar, editProfile, profileForms);
    cleanNewAvatarInput(newAvatar)
  } catch (error) {
    displayEditUserError(error.message);
  }
});

toChangePassword.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setOn(changePassword, profileForms);
  setOff(deleteAvatar, profileButtons, editProfile, setAvatar, editMail, deleteAccount);
});

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    setNewPassword(context.userAuth, profileButtons, changePassword);
    setOff(profileForms, changePassword);
    displayProfile(context.userAuth);
  } catch (error) { }
});


toEditMail.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setPlaceHolders(context.userAuth);
  setOn(editMail, profileForms);
  setOff(profileButtons, changePassword, editProfile, deleteAccount)
});

mailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    setNewMail(context.userAuth, profileButtons, editProfile);
    setOff(profileForms, editMail);
    displayProfile(context.userAuth);
  } catch (error) {
  }
});

toDeleteAccount.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setOn(deleteAccount,profileForms);
  setOff(deleteAvatar, editProfile, setAvatar, profileButtons, changePassword, editMail );
});
  
deleteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    deleteUser(context.userAuth);
    logout(loginPage, homePage);
    setAlertUserDeleted();
    setOff(profileForms)
    context.userAuth = undefined
  } catch (error) {
    console.log(error)
  }
});