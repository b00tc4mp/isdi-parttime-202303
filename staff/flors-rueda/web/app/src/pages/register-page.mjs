import { controlUsernameInput, } from '../ui/general-tools.mjs'
import { register } from '../ui/login-register.mjs';
import { displayRegisterError, } from '../ui/errors.mjs';
import { loginPage } from './login-page.mjs'

export const registerPage = document.querySelector('.register');
const registerForm = document.querySelector('.register-form');
const usernameRegister = document.querySelector('.register-form').querySelector('input[name="username"]');

usernameRegister.addEventListener('input', (event) => {
  controlUsernameInput(usernameRegister);
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    register(registerPage, loginPage);
  } catch (error) {
    displayRegisterError(error.message);
  }
});
  