//
import loginPage from './login-page.js';
import registerUser from '../logic/register-user.js';
import { show, hide } from '../ui.js';

const registerPage = document.querySelector('.register'),
  registerForm = registerPage.querySelector('form');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const registerName = event.target.name.value,
    registerEmail = event.target.email.value,
    registerPassword = event.target.password.value;

  try {
    registerUser(registerName, registerEmail, registerPassword);

    hide(registerPage);
    show(loginPage);
  } catch (error) {
    alert(error.message);
  }
});

registerPage.querySelector('a').addEventListener('click', (event) => {
  event.preventDefault();

  hide(registerPage);
  show(loginPage);
});

export default registerPage;
