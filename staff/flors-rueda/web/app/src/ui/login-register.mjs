import { toggleOff, clearForms, resetAlerts, setAlert, setOn, setPredeterminateAvatar, } from './general-tools.mjs';

import { addNewUser } from '../logic/register-user.mjs'

import {authenticateUser} from '../logic/authenticate-user.mjs'

export const login = (login, home, startHome, username, password) => {
  resetAlerts();
  toggleOff(login, home);
  setOn(startHome)
  let userAuth = authenticateUser(username, password);
  return userAuth
};

const registerUser = (mail, username, password) => {
  document.querySelector('.login-form').querySelector('input[name="username"]').value = username;
  const message = `Welcome, ${username}! Your account is registered. You can sign in now!`;
  setAlert('area-login', 'alert-success', message);
};

export const register = (register, login) => {
  resetAlerts();
  const user = document.querySelector('.register-form').querySelector('input[name="username"]').value;
  const username = '@' + user;
  const mail = document.querySelector('.register-form').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.register-form').querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value;
  addNewUser(mail, username, password, repeatPassword);
  toggleOff(register, login);
  registerUser(mail, user, password, repeatPassword);
};

export const logout = (login, home) => {
  resetAlerts();
  clearForms();
  toggleOff(login, home);
  document.querySelector('.name').innerText = '';
  document.querySelector('.username').innerText = '';
  document.querySelector('.mail').innerText = '';
  setPredeterminateAvatar();
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