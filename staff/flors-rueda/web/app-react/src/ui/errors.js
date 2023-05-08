
import { cleanFocusInputs, clearForms, setAlert } from './general-tools.js';

export const displayLoginError = (message, form) => {
  cleanFocusInputs();
  const title = 'Oh, no!';
  if (message === 'username does not exist') {
    const focusInput = form.querySelector('input[name="username"]');
    const alert = new Alert('danger', message, title);
    focusInput.classList.add('invalid-input');
    return alert;
  };
  if (message === 'password incorrect') {
    const focusInput = form.querySelector('input[name="password"]')
    const alert = new Alert('danger', message, title);
    focusInput.classList.add('invalid-input');
    return alert;
  };
  const alert = new Alert('danger', 'sorry, something went wrong!', title);
  console.log(`register error: ${message}`);
  return alert
};

export const displayRegisterError = (message, form) => {
  cleanFocusInputs();
  const title = 'Oh, no!';
  if (message === 'mail is already registered' || message === 'mail format is not valid') {
    const focusInput = form.querySelector('input[name="mail"]')
    const alert = new Alert('danger', message, title);
    focusInput.classList.add('invalid-input');
    return alert;
  };
  if (message === 'username not available') {
    const focusInput = form.querySelector('input[name="username"]')
    const alert = new Alert('danger', message, title);
    focusInput.classList.add('invalid-input');
    return alert;
  };
  if (message === 'password is not safe' || message === 'password and confirmation password are different') {
    const focusInputs = [form.querySelector('input[name="password"]'), form.querySelector('input[name="repeatPassword"]')]
    const alert = new Alert('danger', message, title);
    focusInputs.forEach((input) => (input.classList.add('invalid-input')));
    return alert;
  } 
  const alert = new Alert('danger', 'sorry, something went wrong!', title);
  console.log(`register error: ${message}`);
  return alert;
};














export const displayChangePasswordError = (message) => {
  if (message === 'password is not safe' || message === 'new and old password are the same' || message === 'password and confirmation password are different') {
    setSimpleAlert('area-change-password', 'alert-danger', message);
    clearForms();
    return;
  };
  if (message === 'password incorrect') {
    setSimpleAlert('area-change-old-password', 'alert-danger', message);
    document.querySelector('.password-form').querySelector('input[name="password"]').value = '';
    return;
  };
  setAlert('area-change', 'alert-danger', 'sorry, something went wrong!');
  clearForms();
  console.log(`change password error: ${message}`);
};

export const displayEditUserError = (message) => {
  if (message === 'mail is already registered') {
    setSimpleAlert('area-edit-mail', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="mail"]').value = '';
    return;
  };
  if (message === 'is not an image url') {
    setSimpleAlert('area-edit-avatar', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="avatar"]').value = '';
    return;
  };
  if (message === 'password incorrect') {
    setSimpleAlert('area-password', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="password"]').value = '';
    return;
  };
  setAlert('area-edit', 'alert-danger', 'sorry, something went wrong!');
  clearForms();
  console.log(`edit profile error: ${message}`);
};

