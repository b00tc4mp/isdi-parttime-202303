import { context,  } from '../ui/general-tools.js';
import { loginPage } from './login-page.js';
import { logout, } from '../ui/login-register.js';
import { setOff, setOn, resetAlerts, clearForms, } from '../ui/general-tools.js'
import { displayProfile, displayWelcome, } from '../ui/home.js'
import { profile, profileButtons, } from './home-edit-profile-page.js';
import { postModal } from './home-posts-modal-page.js';
import { openPostModal, renderAllPosts } from '../ui/posts.js';

export const homePage = document.querySelector('.home');
export const mainHome = document.querySelector('.home-main');
export const profileForms = document.querySelector('.profile-forms');

const toNewPost = document.querySelector('.to-new-post');

const toLogout = document.querySelector('.logout');
const toUserProfile = document.querySelector('.to-user-profile');
const toHome = document.querySelector('.to-home');

const toggleNav = document.querySelector('.nav-menu');
const nav = document.querySelector('.navbar');
const page = document.querySelector('.home-page');

toggleNav.addEventListener('click', (event)  => {
  event.preventDefault();
  toggleNav.classList.toggle('close')
  nav.classList.toggle('show')
})

page.addEventListener('click', (event)  => {
  if((nav.classList).contains('show')){
    event.preventDefault();
    nav.classList.remove('show')
    toggleNav.classList.remove('close')
  }
})

toLogout.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  setOff(profile, profileForms, profileButtons, mainHome)
  logout(loginPage, homePage);
});

toUserProfile.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setOn(profile, profileButtons);
  setOff(mainHome, profileForms);
  displayProfile(context.userAuth);
});

toHome.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  resetAlerts();
  setOn(mainHome);
  setOff(profile, profileButtons, profileForms);
  renderAllPosts(context.userAuth, postModal);
  displayWelcome(context.userAuth)
});


// TODO: figure out why modal sometimes fails

toNewPost.addEventListener('click', (event) => {
  event.preventDefault();
  openPostModal(postModal);
});


  

