import { context, controlUsernameInput,  } from '../ui/general-tools.js';
import { setOff, setOn, toggleOff, resetAlerts, setPredeterminateAvatar, clearForms, getImgUrl } from '../ui/general-tools.js'
import { setNewPassword, setNewUserInfo, displayProfile, setPlaceHolders, setNewMail, deleteUser, setAlertUserDeleted, cleanNewAvatarInput } from '../ui/home.js'
import { displayEditUserError } from '../ui/errors.js';
import { mainHome, homePage, profileForms, addPostModal } from './home-page.js';
import { logout, } from '../ui/login-register.js';
import { loginPage } from './login-page.js';
import initPostsList from '../components/posts-list.js';

export const profile = document.querySelector('.user-profile');
export const profileButtons = document.querySelector('.profile-buttons');
export const toggle = document.querySelector('.mode-toggle');
export const favoritesPage = document.querySelector('.favorites');
export let newAvatar;

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

const toFavorites = document.querySelector('.to-favorites');

const toggleLightToggle = document.querySelector('.hide-mode-toggle');
toggleLightToggle.textContent = (toggle.classList).contains('off') ? 'hide light switch' : 'show light switch'

toggleLightToggle.addEventListener('click', (event) => {
  event.preventDefault();
  toggleOff(toggle);
  toggleLightToggle.textContent === 'hide light switch' ? toggleLightToggle.textContent = 'show light switch' : toggleLightToggle.textContent = 'hide light switch'
});

toFavorites.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  const postFavsList = document.querySelector('.favorites-post-list');
  initPostsList(context.userAuth, addPostModal, 'fav', postFavsList);
  setOn(favoritesPage);
  setOff(profileButtons, changePassword, editProfile, deleteAccount, profileForms);
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
    setOff(profile, profileForms, profileButtons, mainHome)
  } catch (error) {
    console.log(error)
  }
});

toEditProfile.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setPlaceHolders(context.userAuth);
  setOn(editProfile, setAvatar, profileForms);
  setOff(mainHome, profileButtons, changePassword, editMail, deleteAccount);
});

editUsername.addEventListener('input', (event) => {
  controlUsernameInput(editUsername);
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


// Edit avatar

temporalAvatar.addEventListener('change', (event) => {
  try {
    const avatar = document.querySelector('.avatar');
    toggleOff(deleteAvatar, setAvatar);
    getImgUrl(event, (imageUrl) => {
      newAvatar = imageUrl;
      avatar.src = newAvatar;
    });
  } catch (error) {
    console.error(error);
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


