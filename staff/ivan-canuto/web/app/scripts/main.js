const welcomePage = document.querySelector('.welcome-page');
const loginPage = document.querySelector('.login-page');
const registerPage = document.querySelector('.register-page');
const homePage = document.querySelector('.home-page');
const profilePage = document.querySelector('.profile-page')
const changePasswordPage = document.querySelector('.change-password__page');
const changeAvatarPage = document.querySelector('.change-avatar__page');

var authenticatedEmail;
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
const changeAvatarLink = profilePage.querySelector('.change-avatar__link');
const passwordForm = changePasswordPage.querySelector('.password__form');
const avatarForm = changeAvatarPage.querySelector('.avatar__form');
const inputsPasswordForm = passwordForm.querySelectorAll('input');
const registerPasswordIcon = registerPage.querySelector('.register-password-icon');
const repeatedPasswordIcon = registerPage.querySelector('.repeated-password-icon');
const loginPasswordIcon = loginPage.querySelector('.login-password-icon');
const headerTitle = document.querySelector('.header__title');


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

  try {

    registerUser(registerName, registerEmail, registerPassword, repeatedPassword)
    window.alert('User successfully registered.');
    registerPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    registerPage.querySelector('.input-name').value = '';
    registerPage.querySelector('.input-email').value = '';
    registerPage.querySelector('.input-password').value = '';
    registerPage.querySelector('.repeated-password').value = '';

  } catch (error) {
    if (error.name === 'Error') {
      createAlert(error.message);
  } else {
      window.alert('Sorry, something went wrong.')
      console.log(error);
  }
  }
});

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  const loginEmail = loginPage.querySelector('.input-email').value;
  const loginPassword = loginPage.querySelector('.input-password').value;

  try {

    authenticateUser(loginEmail, loginPassword);
    authenticatedEmail = loginEmail;

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

goBackLoginButton.addEventListener('click', ()=>{
  loginPage.querySelectorAll('input').forEach(input => input.value = '')
  loginPage.classList.add('hidden');
  welcomePage.classList.remove('hidden');
});

goBackRegisterButton.addEventListener('click', ()=>{
  registerPage.querySelectorAll('input').forEach(input => input.value = '')
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

registerPasswordIcon.addEventListener('mousedown', ()=>{
  registerPage.querySelector('.input-password').type = 'text';
})
registerPasswordIcon.addEventListener('mouseup', ()=>{
  registerPage.querySelector('.input-password').type = 'password';
})
repeatedPasswordIcon.addEventListener('mousedown', ()=>{
  registerPage.querySelector('.repeated-password').type = 'text';
})
repeatedPasswordIcon.addEventListener('mouseup', ()=>{
  registerPage.querySelector('.repeated-password').type = 'password';
})
loginPasswordIcon.addEventListener('mousedown', ()=>{
  loginPage.querySelector('.input-password').type = 'text';
})
loginPasswordIcon.addEventListener('mouseup', ()=>{
  loginPage.querySelector('.input-password').type = 'password';
})
changePasswordPage.querySelector('.old-password-icon').addEventListener('mousedown', ()=>{
  changePasswordPage.querySelector('.old-password').type = 'text';
})
changePasswordPage.querySelector('.old-password-icon').addEventListener('mouseup', ()=>{
  changePasswordPage.querySelector('.old-password').type = 'password';
})
changePasswordPage.querySelector('.new-password-icon').addEventListener('mousedown', ()=>{
  changePasswordPage.querySelector('.new-password').type = 'text';
})
changePasswordPage.querySelector('.new-password-icon').addEventListener('mouseup', ()=>{
  changePasswordPage.querySelector('.new-password').type = 'password';
})
changePasswordPage.querySelector('.new-password-repeated-icon').addEventListener('mousedown', ()=>{
  changePasswordPage.querySelector('.new-password-repeated').type = 'text';
})
changePasswordPage.querySelector('.new-password-repeated-icon').addEventListener('mouseup', ()=>{
  changePasswordPage.querySelector('.new-password-repeated').type = 'password';
})
changeAvatarPage.querySelector('.avatar-password-icon').addEventListener('mousedown', ()=>{
  changeAvatarPage.querySelector('.avatar-password').type = 'text';
})
changeAvatarPage.querySelector('.avatar-password-icon').addEventListener('mouseup', ()=>{
  changeAvatarPage.querySelector('.avatar-password').type = 'password';
})


