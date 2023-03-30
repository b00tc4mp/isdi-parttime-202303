import {
  toggleOff,
  clearForms,
  resetAlerts,
  setAlert,
  setOn,
} from './general-tools.js';

import {
  addNewUser,
} from '../user-logic.js';

import { 
  validateUserPassword, 
  validateUsername,
  validateMail,
  validateNewPassword,
  validateNewUsername,
} from '../validators.js';

export const authenticateUser = (user, password) => {
  resetAlerts();
  const username = '@' + user;
  validateUsername(username)
  validateUserPassword(username, password)
  return username;
};

export const doLogin = (login, home, startHome) => {
  resetAlerts();
  toggleOff(login, home);
  setOn(startHome)
};

const registerUser = (mail, username, password) => {
  document.querySelector('.login-form').querySelector('input[name="username"]').value = username;
  const message = `Welcome, ${username}! Your account is registered. You can sign in now!`;
  setAlert('area-login', 'alert-success', message);
  addNewUser(mail, username, password);
};

export const doRegister = (register, login) => {
  resetAlerts();
  const user = document.querySelector('.register-form').querySelector('input[name="username"]').value;
  const username = '@' + user
  const mail = document.querySelector('.register-form').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.register-form').querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value;
  validateMail(mail);
  validateNewUsername(username);
  validateNewPassword(password, repeatPassword);
  toggleOff(register, login);
  registerUser(mail, user, password);
};

export const doLogout = (login, home) => {
  resetAlerts();
  clearForms();
  toggleOff(login, home);
  document.querySelector('.name').innerText = '';
  document.querySelector('.username').innerText = '';
  document.querySelector('.mail').innerText = '';
  document.querySelector('.avatar').src = 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png';
};

export const controlUsernameInput = (input) => {
  let username = '';
  const regexRule = /^[a-z0-9]*$/;
  if(!regexRule.test(input.value)) {
    username = input.value.slice(0, -1);
  } else {
    username = input.value
  }
  input.value = username
}

export const changeView = (register, login) => {
  resetAlerts();
  clearForms();
  toggleOff(register, login);
};