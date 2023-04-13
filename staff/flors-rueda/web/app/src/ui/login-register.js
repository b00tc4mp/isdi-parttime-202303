import { toggleOff, clearForms, resetAlerts, setAlert, setOn, setPredeterminateAvatar, setOff} from './general-tools.js';
import { addNewUser } from '../logic/register-user.js'
import {authenticateUser} from '../logic/authenticate-user.js'
import { toggle } from '../pages/home-edit-profile-page.js';

export const login = (login, home, startHome, username, password) => {
  resetAlerts();
  const userAuth = authenticateUser(username, password);
  setOff(login, toggle)
  setOn(home, startHome);
  return userAuth
};

const registerUser = (username) => {
  document.querySelector('.login-form').querySelector('input[name="username"]').value = username;
  const message = `Welcome, ${username}! Your account is registered. You can sign in now!`;
  setAlert('area-login', 'alert-success', message);
};

export const register = (register, login) => {
  resetAlerts();
  const user = document.querySelector('.register-form').querySelector('input[name="username"]').value;
  const username = '@' + user.toLowerCase();
  const mail = document.querySelector('.register-form').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.register-form').querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value;
  addNewUser(mail, username, password, repeatPassword);
  toggleOff(register, login);
  registerUser(user);
};

export const logout = (login, home) => {
  resetAlerts();
  clearForms();
  toggleOff(login, home);
  setOn(toggle)
  document.querySelector('.name').innerText = '';
  document.querySelector('.username').innerText = '';
  document.querySelector('.since').innerText = '';
  setPredeterminateAvatar();
};

export const changeView = (register, login) => {
  resetAlerts();
  clearForms();
  toggleOff(register, login);
};