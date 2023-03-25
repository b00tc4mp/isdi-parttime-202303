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
  isPasswordSafe,
  confirmPassword,
} from '../logic/user.js';

export const displayWelcome = (userAuth) => {
  document.querySelector('.welcome').innerText = `Welcome to this app, ${userAuth.name}`;
}

export const displayProfile = (userAuth) => {
  document.querySelector('.name').innerText = userAuth.name;
  document.querySelector('.username').innerText = userAuth.username;
  document.querySelector('.mail').innerText = userAuth.mail;
  document.querySelector('.avatar').src = userAuth.avatar;
}

export const setNewPassword = (userAuth, profileButtons, changePassword, startHome, editProfile) => {
  resetAlerts();
  const newPassword = document.querySelector('.password-form').querySelector('input[name="new-password"]').value;
  const repeatPassword = document.querySelector('.password-form').querySelector('input[name="repeat-new-password"]').value;
  const oldPassword = document.querySelector('.password-form').querySelector('input[name="password"]').value;
  if (!isPasswordSafe(newPassword)){
    const message ='Use minimum 6 characters, a number, and lower and capital letters.';
    setSimpleAlert('area-change-password', 'alert-danger', message);
    clearForms();
    return userAuth;
  };
  if (!confirmPassword(newPassword, repeatPassword)){
    const message = 'The password and confirmation password do not match.';
    setSimpleAlert('area-change-repeat-password', 'alert-danger', message);
    clearForms();
    return userAuth;
  };
  if (!isPasswordCorrect(userAuth.mail, oldPassword)){
    const message = 'Incorrect password!';
    setSimpleAlert('area-change-old-password', 'alert-danger', message);
    document.querySelector('.password-form').querySelector('input[name="password"]').value = '';
    return userAuth;
  };
  userAuth.password = newPassword;
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, changePassword);
  clearForms();
  return userAuth;
};

const isAvatarUrlValid = (url) => {
  const regexRule = /\.(jpg|jpeg|png|webp)$/;
  return regexRule.test(url)
};

export const setPlaceHolders = (userAuth) => {
  document.querySelector('.edit-form').querySelector('input[name="display-name"]').placeholder = userAuth.name;
  document.querySelector('.edit-form').querySelector('input[name="mail"]').placeholder = userAuth.mail; 
}

export const setNewUserInfo = (userAuth, profileButtons, editProfile) => {
  resetAlerts();
  const newName = document.querySelector('.edit-form').querySelector('input[name="display-name"]').value;
  const newMail = document.querySelector('.edit-form').querySelector('input[name="mail"]').value;
  const newAvatar = document.querySelector('.edit-form').querySelector('input[name="avatar"]').value;
  const password = document.querySelector('.edit-form').querySelector('input[name="password"]').value;
  if(isMailRegistered(newMail)){
    const message = 'This email is already in use.';
    setSimpleAlert('area-edit-mail', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="mail"]').value = '';
    return userAuth;
  };
  if(newAvatar && !isAvatarUrlValid(newAvatar)){
    const message = 'Invalid format. Make sure the url belongs to an image.';
    setSimpleAlert('area-edit-avatar', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="avatar"]').value = '';
    return userAuth;
  };
  if (!isPasswordCorrect(userAuth.mail, password)){
    const message = 'Incorrect password!';
    setSimpleAlert('area-password', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="password"]').value = '';
    return userAuth;
  };
  if(newName) userAuth.name = newName;
  if(newMail) userAuth.mail = newMail;
  if(newAvatar) userAuth.avatar = newAvatar;
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, editProfile);
  clearForms();
  return userAuth;
}