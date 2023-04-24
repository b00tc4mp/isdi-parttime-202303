import { clearForms, toggleOff } from './general-tools.js';


export const login = (login, home, startHome, username, password) => {
  resetAlerts();
  const userAuth = authenticateUser(username, password);
  setOff(login, toggle)
  setOn(home, startHome);
  return userAuth
};

export const logout = (login, home) => {
  resetAlerts();
  clearForms();
  toggleOff(login, home);
  setOn(toggle)
  document.querySelector('.name').innerText = '';
  document.querySelector('.username').innerText = '';
  document.querySelector('.since').innerText = '';
  delete context.userAuth;
  setPredeterminateAvatar();
};

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