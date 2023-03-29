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
  findUser,
  areNewOldPasswordsEqual,
  updateUserPassword,
  updateUserName,
  updateUserMail,
  updateUserAvatar,
} from '../logic/user.js';

export const displayWelcome = (userAuth) => {
  const user = findUser(userAuth);
  document.querySelector('.welcome').innerText = `Welcome to this app, ${user.name}`;
}

export const displayProfile = (userAuth) => {
  const user = findUser(userAuth);
  document.querySelector('.name').innerText = user.name;
  document.querySelector('.username').innerText = user.username;
  document.querySelector('.mail').innerText = user.mail;
  document.querySelector('.avatar').src = user.avatar;
}

export const setNewPassword = (userAuth, profileButtons, changePassword) => {
  resetAlerts();
  const newPassword = document.querySelector('.password-form').querySelector('input[name="new-password"]').value;
  const repeatPassword = document.querySelector('.password-form').querySelector('input[name="repeat-new-password"]').value;
  const oldPassword = document.querySelector('.password-form').querySelector('input[name="password"]').value;
  if(areNewOldPasswordsEqual(userAuth, newPassword)){
    const message ='The new password and the old one can not be the same.';
    setSimpleAlert('area-change-password', 'alert-danger', message);
    clearForms();
    return;
  }
  if (!isPasswordSafe(newPassword)){
    const message ='Use minimum 6 characters, a number, and lower and capital letters.';
    setSimpleAlert('area-change-password', 'alert-danger', message);
    clearForms();
    return;
  };
  if (!confirmPassword(newPassword, repeatPassword)){
    const message = 'The password and confirmation password do not match.';
    setSimpleAlert('area-change-repeat-password', 'alert-danger', message);
    clearForms();
    return;
  };
  if (!isPasswordCorrect(userAuth, oldPassword)){
    const message = 'Incorrect password!';
    setSimpleAlert('area-change-old-password', 'alert-danger', message);
    document.querySelector('.password-form').querySelector('input[name="password"]').value = '';
    return;
  };
  updateUserPassword(userAuth, newPassword);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, changePassword);
  clearForms();
};

const isAvatarUrlValid = (url) => {
  const regexRule = /\.(jpg|jpeg|png|webp)$/;
  return regexRule.test(url);
};

export const setPlaceHolders = (userAuth) => {
  const user = findUser(userAuth);
  document.querySelector('.edit-form').querySelector('input[name="display-name"]').placeholder = user.name;
  document.querySelector('.edit-form').querySelector('input[name="mail"]').placeholder = user.mail; 
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
    return;
  };
  if(newAvatar && !isAvatarUrlValid(newAvatar)){
    const message = 'Invalid format. Make sure the url belongs to an image.';
    setSimpleAlert('area-edit-avatar', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="avatar"]').value = '';
    return;
  };
  if (!isPasswordCorrect(userAuth, password)){
    const message = 'Incorrect password!';
    setSimpleAlert('area-password', 'alert-danger', message);
    document.querySelector('.edit-form').querySelector('input[name="password"]').value = '';
    return;
  };
  if(newName) updateUserName(userAuth, newName);
  if(newMail) updateUserMail(userAuth, newMail);
  if(newAvatar) updateUserAvatar(userAuth, newAvatar);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, editProfile);
  clearForms();
}