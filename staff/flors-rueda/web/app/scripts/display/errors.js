import { clearForms, setAlert, setSimpleAlert } from './general-tools.js';

export const displayLoginError = (message) => {
  if (message === 'username does not exist') {
    setSimpleAlert('area-login-username', 'alert-danger', message);
    clearForms();
    return;
  };
  if (message === 'password incorrect') {
    setSimpleAlert('area-login-password', 'alert-danger', message);
    document.querySelector('.login-form').querySelector('input[name="password"]').value = '';
    return;
  };
  setAlert('area-login', 'alert-danger', 'sorry, something went wrong!');
  clearForms();
  console.log(`login error: ${message}`);
};

export const displayRegisterError = (message) => {
  if (message === 'mail is already registered') {
    setSimpleAlert('area-register-mail', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="mail"]').value = '';
    return;
  };
  if (message === 'username not available') {
    setSimpleAlert('area-register-username', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="username"]').value = '';
    return;
  };
  if (message === 'password is not safe' || message === 'password and confirmation password are different') {
    setSimpleAlert('area-register-password', 'alert-danger', message);
    document.querySelector('.register-form').querySelector('input[name="password"]').value = '';
    document.querySelector('.register-form').querySelector('input[name="repeat-password"]').value = '';
    return;
  };
  setAlert('area-register', 'alert-danger', 'sorry, something went wrong!');
  clearForms(); 
  console.log(`register error: ${message}`);
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

