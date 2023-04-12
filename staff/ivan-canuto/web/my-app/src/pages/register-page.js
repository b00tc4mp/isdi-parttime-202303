import { loginPage } from "./login-page.js";

export const registerPage = document.querySelector('.register-page');
const registerForm = registerPage.querySelector('.register-form');
const registerPasswordIcon = registerPage.querySelector('.register-password-icon');
const repeatedPasswordIcon = registerPage.querySelector('.repeated-password-icon');
const goLoginPage = registerPage.querySelector('.go-login-page');

goLoginPage.addEventListener('click', ()=>{
  registerPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
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

goLoginPage.addEventListener('click', ()=>{
  registerPage.querySelectorAll('input').forEach(input => input.value = '')
  registerPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
});

registerPasswordIcon.addEventListener('mousedown', ()=>{
  registerPage.querySelector('.input-password').type = 'text';
})
registerPasswordIcon.addEventListener('mouseup', ()=>{
  registerPage.querySelector('.input-password').type = 'password';
})
repeatedPasswordIcon.addEventListener('mousedown', ()=>{
  registerPage.querySelector('.input-password').type = 'text';
})
repeatedPasswordIcon.addEventListener('mouseup', ()=>{
  registerPage.querySelector('.input-password').type = 'password';
})

