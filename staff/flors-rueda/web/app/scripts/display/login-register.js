import { toggleOff, clearForms, resetAlerts, setAlert, setSimpleAlert, } from './general-tools.js';
import { isPasswordCorrect, isMailRegistered, isUsernameRegistered, addNewUser, isPasswordSafe,} from '../logic/login-register.js';

export const authenticateUser = (mail, password) => {
  if (!isMailRegistered(mail)) {
    const message = 'This email is not vinculated to any account!';
    setSimpleAlert('area-login-mail', 'alert-danger', message);
    clearForms();
    return false;
  } else if (!isPasswordCorrect(mail, password)) {
    const message = 'Incorrect password!';
    setSimpleAlert('area-login-password', 'alert-danger', message);
    document.querySelector('.login-form').querySelector('input[name="password"]').value = '';
    return false;
  } else {
    return true;
  };
};

export const doLogin = (login, home) => {
  resetAlerts();
  toggleOff(login, home);
};

const registerUser = (mail, username, password) => {
  addNewUser(mail, username, password);
  document.querySelector('.login-form').querySelector('input[name="mail"]').value = mail;
  const message = `Welcome, ${username}! Your account is registered. You can sign in now!`;
  setAlert('area-login', 'alert-success', message);
};

const registerFailed = (mail, username, password) => {
  if (isMailRegistered(mail)) {
    const message = 'This email is already registered.';
    setSimpleAlert('area-register-mail', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="mail"]').value = '';
  };
  if (isUsernameRegistered(username)) {
    const message = 'This username is not available.';
    setSimpleAlert('area-register-username', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="username"]').value = '';
  };
  if (!isPasswordSafe(password)) {
    const message =
      'Use minimum 6 characters, a number, and both lower and capital letters';
    setSimpleAlert('area-register-password', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="password"]').value = '';
  };
};

export const doRegister = (register, login) => {
  resetAlerts();
  const username = document.querySelector('.register-form').querySelector('input[name="username"]').value;
  const mail = document.querySelector('.register-form').querySelector('input[name="mail"]').value.toLowerCase();
  const password = document.querySelector('.register-form').querySelector('input[name="password"]').value;
  if (isPasswordSafe(password) && !isMailRegistered(mail) && !isUsernameRegistered(username)) {
    registerUser(mail, username, password);
    toggleOff(register, login);
  } else {
    registerFailed(mail, username, password);
  };
};

export const doLogout = (login, home) => {
  resetAlerts();
  clearForms();
  toggleOff(login, home);
};

export const changeView = (register, login) => {
    resetAlerts();
    clearForms();
    toggleOff(register, login);
};