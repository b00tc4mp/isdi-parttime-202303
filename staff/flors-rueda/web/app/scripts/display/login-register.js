import {
  toggleOff,
  clearForms,
  resetAlerts,
  setAlert,
  setSimpleAlert,
} from './general-tools.js';

import {
  isPasswordCorrect,
  isMailRegistered,
  isUsernameRegistered,
  addNewUser,
  isPasswordSafe,
  confirmPassword,
} from '../logic/user.js';

export const authenticateUser = (user, password) => {
  resetAlerts();
  const username = '@' + user;
  console.log(username)
  if (!isUsernameRegistered(username)) {
    const message = 'This username is not vinculated to any account!';
    setSimpleAlert('area-login-username', 'alert-danger', message);
    clearForms();
    return;
  } else if (!isPasswordCorrect(username, password)) {
    const message = 'Incorrect password!';
    setSimpleAlert('area-login-password', 'alert-danger', message);
    document.querySelector('.login-form').querySelector('input[name="password"]').value = '';
    return;
  } else {
    return username;
  };
};

export const doLogin = (login, home) => {
  resetAlerts();
  toggleOff(login, home);
};

const registerUser = (mail, username, password) => {
  document.querySelector('.login-form').querySelector('input[name="username"]').value = username;
  const message = `Welcome, ${username}! Your account is registered. You can sign in now!`;
  setAlert('area-login', 'alert-success', message);
  return addNewUser(mail, username, password);
};

const registerFailed = (mail, username, password, repeatPassword) => {
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
    const message = 'Use minimum 6 characters, a number, and lower and capital letters.';
    setSimpleAlert('area-register-password', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="password"]').value = '';
    document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value = '';
  };
  if (!confirmPassword(password, repeatPassword)){
    const message = 'The password and confirmation password do not match.';
    setSimpleAlert('area-register-repeat-password', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value = '';
  };
};

export const doRegister = (register, login) => {
  resetAlerts();
  const username = document.querySelector('.register-form').querySelector('input[name="username"]').value;
  const mail = document.querySelector('.register-form').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.register-form').querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value;
  if (isPasswordSafe(password) && !isMailRegistered(mail) && !isUsernameRegistered(username) && confirmPassword(password, repeatPassword)) {
    toggleOff(register, login);
    return registerUser(mail, username, password);
  } else {
    registerFailed(mail, username, password, repeatPassword);
  };
};

export const doLogout = (login, home) => {
  resetAlerts();
  clearForms();
  toggleOff(login, home);
};

export const validateUsername = (input) => {
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