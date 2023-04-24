import { addOffClass, removeOffClass } from '../ui.js';
import './change-icon.js'
import { loginPage } from './login-page.js';
import { changeAvatar } from '../logic/change-avatar.js'
import { changePassword } from '../logic/change-password.js'

export const homePage = document.querySelector('.home-page');
export const profilePage = document.querySelector('.profile-page')
const changePasswordPage = document.querySelector('.change-password__page');
const changeAvatarPage = document.querySelector('.change-avatar__page');

export const profileImage = homePage.querySelector('.profile__image');
export const headerTitle = document.querySelector('.header__title');
const logOutButton = homePage.querySelector('.sign-off__button');
const returnProfileButton = profilePage.querySelector('.return-profile-page__button')
const changePasswordLink = profilePage.querySelector('.change-password__link');
const changeAvatarLink = profilePage.querySelector('.change-avatar__link');
const passwordForm = changePasswordPage.querySelector('.password__form');
const avatarForm = changeAvatarPage.querySelector('.avatar__form');
const inputsPasswordForm = passwordForm.querySelectorAll('input');

profileImage.addEventListener('click', ()=>{
  addOffClass(homePage)
  removeOffClass(profilePage)
})

logOutButton.addEventListener('click', ()=>{
  addOffClass(homePage)
  removeOffClass(loginPage)
  delete context.userId
})

returnProfileButton.addEventListener('click', ()=> {
  addOffClass(profilePage, changePasswordPage, changeAvatarPage)
  removeOffClass(homePage)
})

changePasswordLink.addEventListener('click', ()=>{
removeOffClass(changePasswordPage)
})

changeAvatarLink.addEventListener('click', ()=>{
  removeOffClass(changeAvatarPage)
})

passwordForm.addEventListener('submit', (e)=>{

  const oldPassword = e.target.oldPassword.value;
  const newPassword = e.target.newPassword.value;
  const newPasswordRepeated = e.target.newPasswordRepeated.value;

  e.preventDefault();

  try {

    changePassword(authenticatedEmail, oldPassword, newPassword, newPasswordRepeated)
    inputsPasswordForm.reset()
    changePasswordPage.classList.add('hidden');

  } catch(error) {
    if (error.name === 'Error') {
      createAlert(error.message);
    } else {
        window.alert('Sorry, something went wrong.')
        console.log(error);
    }
  }
})

avatarForm.addEventListener('submit', (e)=>{

  const avatarUrl = e.target.avatarUrl.value;
  const password = e.target.password.value;

  e.preventDefault();

  try {

    changeAvatar(authenticatedEmail, avatarUrl, password)
    avatarForm.querySelector('input[name="password"]').value = '';
    addOffClass(changeAvatarPage)

  } catch(error) {
    if (error.name === 'Error') {
      createAlert(error.message);
    } else {
        window.alert('Sorry, something went wrong.')
        console.log(error);
    }
  }
})

changePasswordPage.querySelector('.exit-button').addEventListener('click', ()=>{
  inputsPasswordForm.reset()
  addOffClass(changePasswordPage)
})

changeAvatarPage.querySelector('.exit-button').addEventListener('click', ()=>{
  avatarForm.reset()
  addOffClass(changeAvatarPage)
})
