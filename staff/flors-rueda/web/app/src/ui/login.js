import { clearForms, toggleOff } from './general-tools.js';

export const changeView = (changeViewLink, register, login) => { 
  clearForms();
  const message = document.querySelector('.login-page__change-view').querySelector('p')
  if(login.classList.contains('off')) {
    changeViewLink.innerText = 'Sign in';
    message.innerText = 'Already have an account?'
  } else {
    changeViewLink.innerText = 'Sign up';
    message.innerText = `You're new here?`
  }
  toggleOff(register, login);
};