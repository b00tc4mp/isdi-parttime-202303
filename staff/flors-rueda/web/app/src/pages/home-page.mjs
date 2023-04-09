import { context } from '../ui/general-tools.mjs';
import { loginPage } from './login-page.mjs';
import { logout, } from '../ui/login-register.mjs';
import { setOff, setOn, resetAlerts, clearForms, } from '../ui/general-tools.mjs'
import { displayProfile, displayWelcome, printPosts, } from '../ui/home.mjs'
import { profile, profileButtons, } from './home-edit-profile-page.mjs';

export const homePage = document.querySelector('.home');
export const startHome = document.querySelector('.home-start');
export const profileForms = document.querySelector('.profile-forms');

const toLogout = document.querySelector('.logout');
const toUserProfile = document.querySelector('.to-user-profile');
const toHome = document.querySelector('.to-home');

const postModal = document.querySelector('.post-modal');
const toNewPost = document.querySelector('.to-new-post');
const cancelPost = document.querySelector('.cancel-post')

toLogout.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setOff(profile, profileForms, profileButtons, startHome)
  context.userAuth = undefined;
  logout(loginPage, homePage);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setOn(profile, profileButtons);
  setOff(startHome, profileForms);
  displayProfile(context.userAuth);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setOn(startHome);
  setOff(profile, profileButtons, profileForms);
  displayWelcome(context.userAuth)
});

const openModal = (modal) => {
  const blur = document.querySelector('.blur');
  setOn(modal, blur);
};

const closeModal  = (modal) => {
  const blur = document.querySelector('.blur');
  setOff(modal, blur);
};


toNewPost.addEventListener('click', (event) => {
  event.preventDefault();
  openModal(postModal)
})

cancelPost.addEventListener('click', (event) => {
  event.preventDefault();
  closeModal(postModal)
})

//TODO: add create post logic
