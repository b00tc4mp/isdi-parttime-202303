import { isPasswordCorrect, isMailRegistered, isUsernameRegistered, addNewUser, } from './usersDataTools.js';
import { isPasswordSafe, } from './safePasswordTools.js'

export const toggleOff = (...items) => {
  items.forEach((item) => {
    item.classList.toggle('off');
  });
};

const clearInitialForm = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
};

const resetAlertStyles = (alertUser) => {
  alertUser.classList.remove('alert-success');
  alertUser.classList.remove('alert-warning');
  alertUser.classList.remove('alert-danger');
  alertUser.classList.add('off');
};

const resetAlerts = () => {
  const alerts = document.querySelectorAll('.alert');
  if (alerts.length > 0) {
    alerts.forEach((alertUser) => resetAlertStyles(alertUser));
  };
};

export const changeView = (register, login) => {
  resetAlerts();
  clearInitialForm();
  toggleOff(register, login);
};

const setAlert = (alertArea, alertColor, alertMessage) => {
  const alertUser = document.querySelector(`.${alertArea}`);
  alertUser.innerHTML = `${alertMessage}<span class='close-alert'>X</span>`;
  alertUser.classList.add(alertColor);
  alertUser.classList.remove('off');
  const closeAlert = document.querySelector(`.${alertArea}`).querySelector('.close-alert');
  closeAlert.addEventListener('click', (event) => {
    event.preventDefault();
    alertUser.classList.add('off');
  });
};

export const authenticateUser = (mail, password) => {
  if(!isMailRegistered(mail)){
    const message = 'This email is not vinculated to any account!';
    setAlert('area-login-mail', 'alert-danger', message);
    clearInitialForm();
    return false;
  } else if (!isPasswordCorrect(mail, password)) {
    const message = 'Incorrect password!';
    setAlert('area-login-password', 'alert-danger', message);
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
  setAlert('area-login-mail', 'alert-success', message);
};

const registerFailed = (mail, username, password) => {
  if (isMailRegistered(mail)) {
    const message = 'This email is already registered.';
    setAlert('area-register-mail', 'alert-warning', message);
    document.querySelector('.register-form').querySelector('input[name="mail"]').value = '';
  };
  if (isUsernameRegistered(username)) {
    const message = 'This username is not available.';
    setAlert('area-register-username', 'alert-warning', message);
    document.querySelector('.register-form').querySelector('input[name="username"]').value = '';
  };
  if (!isPasswordSafe(password)) {
    const message = 'Use minimum 6 characters, a number, and both lower and capital letters';
    setAlert('area-register-password', 'alert-warning', message);
    document.querySelector('.register-form').querySelector('input[name="password"]').value = '';
  };
};

export const doRegister = (register, login) => {
  resetAlerts();
  const username =  document.querySelector('.register-form').querySelector('input[name="username"]').value;
  const mail = document.querySelector('.register-form').querySelector('input[name="mail"]').value.toLowerCase();
  const password = document.querySelector('.register-form').querySelector('input[name="password"]').value;
  if(isPasswordSafe(password) && !isMailRegistered(mail) && !isUsernameRegistered(username)){
    registerUser(mail, username, password);
    toggleOff(register, login);
  } else {
    registerFailed(mail, username, password);
  }
};

export const doLogout = (login, home) => {
  resetAlerts();
  clearInitialForm();
  toggleOff(login, home);
};