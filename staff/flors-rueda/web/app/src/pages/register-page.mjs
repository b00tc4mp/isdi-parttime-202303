import { doRegister, controlUsernameInput, } from '../ui/login-register.mjs';
import { displayRegisterError, } from '../ui/errors.mjs';
import { login } from './login-page.mjs'

export const register = document.querySelector('.register');
const registerForm = document.querySelector('.register-form');
const usernameRegister = document.querySelector('.register-form').querySelector('input[name="username"]');

usernameRegister.addEventListener('input', (event) => {
    controlUsernameInput(usernameRegister);
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      doRegister(register, login);
    } catch (error) {
      displayRegisterError(error.message);
    }
  });
  