import { homePage } from "./home-page.js";
import { registerPage } from "./register-page.js";
import { authenticateUser } from "../logic/authenticate-user.js";

export const loginPage = document.querySelector('.login-page');
const loginForm = loginPage.querySelector('.login-form');
const loginPasswordIcon = loginPage.querySelector('.login-password-icon');
const goRegisterPage = loginPage.querySelector('.go-register-page');

goRegisterPage.addEventListener('click', ()=>{
  loginPage.classList.remove('hidden');
  registerPage.classList.add('hidden');
})

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  const loginEmail = loginPage.querySelector('.input-email').value;
  const loginPassword = loginPage.querySelector('.input-password').value;

  try {

    authenticateUser(loginEmail, loginPassword);
    let authenticatedEmail = loginEmail;

    let user = retrieveUser(authenticatedEmail)

    headerTitle.textContent = user.name + '!'
    profileImage.src = user.avatar

    loginPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    loginPage.querySelector('.input-email').value = '';
    loginPage.querySelector('.input-password').value = '';

  } catch(error) {
    if (error.name === 'Error') {
      createAlert(error.message);
    } else {
        window.alert('Sorry, something went wrong.')
        console.log(error);
    }
  }
});

goRegisterPage.addEventListener('click', ()=>{
  loginPage.querySelectorAll('input').forEach(input => input.value = '')
  loginPage.classList.add('hidden');
  registerPage.classList.remove('hidden')
});

loginPasswordIcon.addEventListener('mousedown', ()=>{
  loginPage.querySelector('.input-password').type = 'text';
})
loginPasswordIcon.addEventListener('mouseup', ()=>{
  loginPage.querySelector('.input-password').type = 'password';
})
