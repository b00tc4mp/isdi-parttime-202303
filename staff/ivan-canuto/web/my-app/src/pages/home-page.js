import './change-icon.js'

export const homePage = document.querySelector('.home-page');
export const profilePage = document.querySelector('.profile-page')
const changePasswordPage = document.querySelector('.change-password__page');
const changeAvatarPage = document.querySelector('.change-avatar__page');

let authenticatedEmail;
const profileImage = homePage.querySelector('.navigation-bar__image');
const logOutButton = homePage.querySelector('.sign-off__button');
const returnProfileButton = profilePage.querySelector('.return-profile-page__button')
const changePasswordLink = profilePage.querySelector('.change-password__link');
const changeAvatarLink = profilePage.querySelector('.change-avatar__link');
const passwordForm = changePasswordPage.querySelector('.password__form');
const avatarForm = changeAvatarPage.querySelector('.avatar__form');
const inputsPasswordForm = passwordForm.querySelectorAll('input');
const headerTitle = document.querySelector('.header__title');

profileImage.addEventListener('click', ()=>{
  homePage.classList.add('hidden');
  profilePage.classList.remove('hidden');
})

logOutButton.addEventListener('click', ()=>{
  homePage.classList.add('hidden');
  loginPage.classList.remove('hidden');
})

returnProfileButton.addEventListener('click', ()=> {
  profilePage.classList.add('hidden');
  homePage.classList.remove('hidden');
  changePasswordPage.classList.add('hidden');
  changeAvatarPage.classList.add('hidden');
})

changePasswordLink.addEventListener('click', ()=>{
  changePasswordPage.classList.remove('hidden');
})

changeAvatarLink.addEventListener('click', ()=>{
  changeAvatarPage.classList.remove('hidden');
})

passwordForm.addEventListener('submit', (e)=>{

  const oldPassword = e.target.oldPassword.value;
  const newPassword = e.target.newPassword.value;
  const newPasswordRepeated = e.target.newPasswordRepeated.value;

  e.preventDefault();

  try {

    changePassword(authenticatedEmail, oldPassword, newPassword, newPasswordRepeated)
    inputsPasswordForm.forEach(input => input.value = '');
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
    changeAvatarPage.classList.add('hidden');

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
  inputsPasswordForm.forEach(input => input.value = '');
  changePasswordPage.classList.add('hidden');
})

changeAvatarPage.querySelector('.exit-button').addEventListener('click', ()=>{
  avatarForm.querySelector('input[name="password"]').value = '';
  changeAvatarPage.classList.add('hidden');
})
