import { context, toggleOff } from '../ui/general-tools.mjs';
import { loginPage } from './login-page.mjs';
import { logout, } from '../ui/login-register.mjs';
import { setOff, setOn, resetAlerts, clearForms, getImgUrl } from '../ui/general-tools.mjs'
import { displayProfile, displayWelcome, printPosts, closeModal, openModal, post} from '../ui/home.mjs'
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
  printPosts();
  displayWelcome(context.userAuth)
});

toNewPost.addEventListener('click', (event) => {
  event.preventDefault();
  openModal(postModal);
});

cancelPost.addEventListener('click', (event) => {
  event.preventDefault();
  closeModal(postModal);
});


const temporalNewPostImg = document.querySelector('.add-post-image').querySelector('input[type="file"]');
const deleteNewPostImg = document.querySelector('.add-post-image').querySelector('.delete-img');
const setNewPostImg = document.querySelector('.set-image');
const selectedNewPostImg = document.querySelector('.new-post-image');
const newPostTextInput = document.querySelector('.new-post-form').querySelector('input[name="post-text"]');
const sendPost = document.querySelector('.new-post-form')
let newPostImg;

temporalNewPostImg.addEventListener('change', (event) => {
  try {
    toggleOff(deleteNewPostImg, setNewPostImg);
    newPostImg = getImgUrl(event);
    selectedNewPostImg.src = newPostImg;
  } catch (error) {}
});

deleteNewPostImg.addEventListener('click', (event) => {
  event.preventDefault();
  newPostImg = undefined;
  temporalNewPostImg.value = '';
  selectedNewPostImg.src = 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png';
  toggleOff(deleteNewPostImg, setNewPostImg);
});

sendPost.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const newPostText = newPostTextInput.value
  post(newPostImg, newPostText, context.userAuth, postModal)
  clearForms();
  temporalNewPostImg.value = '';
  selectedNewPostImg.src = 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png';
  setOn(setNewPostImg)
})
  

