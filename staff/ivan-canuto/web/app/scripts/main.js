const welcomePage = document.querySelector('.welcome-page');
const loginPage = document.querySelector('.login-page');
const registerPage = document.querySelector('.register-page');
const homePage = document.querySelector('.home-page');
const profilePage = document.querySelector('.profile-page')
const changePasswordPage = document.querySelector('.change-password__page');

const loginButton = document.querySelector('.login-button');
const registerButton = document.querySelector('.register-button');
const loginForm = loginPage.querySelector('.login-form');
const registerForm = registerPage.querySelector('.register-form');
const goBackLoginButton = loginPage.querySelector('.go-back');
const goBackRegisterButton = registerPage.querySelector('.go-back');
const profileImage = homePage.querySelector('.navigation-bar__image');
const signOffButton = homePage.querySelector('.sign-off__button');
const returnProfileButton = profilePage.querySelector('.return-profile-page__button')
const changePasswordLink = profilePage.querySelector('.change-password__link');
const passwordForm = changePasswordPage.querySelector('.password-form');
const inputsForm = passwordForm.querySelectorAll('input');
const exitButton = changePasswordPage.querySelector('.exit-button');


loginButton.addEventListener('click', ()=>{
  welcomePage.classList.add('hidden');
  loginPage.classList.remove('hidden');
})

registerButton.addEventListener('click', ()=>{
  welcomePage.classList.add('hidden');
  registerPage.classList.remove('hidden');
})

registerForm.addEventListener('submit', (e)=>{
  
  const registerName = registerPage.querySelector('.input-name').value;
  const registerEmail = registerPage.querySelector('.input-email').value;
  const registerPassword = registerPage.querySelector('.input-password').value;
  const repeatedPassword = registerPage.querySelector('.repeated-password').value;

  e.preventDefault();

  if(registerUser(registerName, registerEmail, registerPassword, repeatedPassword)) {
    window.alert('User successfully registered.');
    registerPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    return;
  } else return;
});

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  const loginEmail = loginPage.querySelector('.input-email').value;
  const loginPassword = loginPage.querySelector('.input-password').value;

  if (authenticateUser(loginEmail, loginPassword)) {
    loginPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    return;
  } else return;
    
});

goBackLoginButton.addEventListener('click', ()=>{
  loginPage.classList.add('hidden');
  welcomePage.classList.remove('hidden');
});

goBackRegisterButton.addEventListener('click', ()=>{
  registerPage.classList.add('hidden');
  welcomePage.classList.remove('hidden');
});

profileImage.addEventListener('click', ()=>{
  homePage.classList.add('hidden');
  profilePage.classList.remove('hidden');
})

signOffButton.addEventListener('click', ()=>{
  homePage.classList.add('hidden');
  welcomePage.classList.remove('hidden');
})

returnProfileButton.addEventListener('click', ()=> {
  profilePage.classList.add('hidden');
  homePage.classList.remove('hidden');
})

changePasswordLink.addEventListener('click', ()=>{
  changePasswordPage.classList.remove('hidden');
})

passwordForm.addEventListener('submit', (e)=>{

  const oldPassword = changePasswordPage.querySelector('.old-password').value;
  const newPassword = changePasswordPage.querySelector('.new-password').value;
  const newPasswordRepeated = changePasswordPage.querySelector('.new-password-repeated').value;

  e.preventDefault();

  if (changePassword(oldPassword, newPassword, newPasswordRepeated) == true) {
    inputsForm.forEach(input => input.value = '');
    changePasswordPage.classList.add('hidden');
    return;
  };
})

exitButton.addEventListener('click', ()=>{
  inputsForm.forEach(input => input.value = '');
  changePasswordPage.classList.add('hidden');
  return;
})


