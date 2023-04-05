import {
  toggleOff,
  clearForms,
  resetAlerts,
  setAlert,
  setOn,
  setPredeterminateAvatar,
} from './general-tools.mjs';

import { 
  validateUserPassword,
  validatePasswordChange,
  validateMail,
  validateNewPassword,
  validateName,
} from '../users/validators.mjs';

import {
  findUser,
  updateUserPassword,
  updateUserName,
  updateUserMail,
  updateUserAvatar,
} from '../users/utils.mjs';


export const displayWelcome = (userAuth) => {
  const user = findUser(userAuth);
  document.querySelector('.welcome').innerText = `Welcome to this app, ${user.name}`;
}

export const displayProfile = (userAuth) => {
  const user = findUser(userAuth);
  document.querySelector('.name').innerText = user.name;
  document.querySelector('.username').innerText = user.username;
  document.querySelector('.mail').innerText = user.mail;
  user.avatar ? setPredeterminateAvatar(userAuth) : setPredeterminateAvatar();
}

export const setNewPassword = (userAuth, profileButtons, changePassword) => {
  resetAlerts();
  const newPassword = document.querySelector('.password-form').querySelector('input[name="new-password"]').value;
  const repeatPassword = document.querySelector('.password-form').querySelector('input[name="repeat-new-password"]').value;
  const oldPassword = document.querySelector('.password-form').querySelector('input[name="password"]').value;
  validatePasswordChange(userAuth, newPassword)
  validateNewPassword(newPassword, repeatPassword);
  validateUserPassword(userAuth, oldPassword);
  updateUserPassword(userAuth, newPassword);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, changePassword);
  clearForms();
};

export const setPlaceHolders = (userAuth) => {
  const user = findUser(userAuth);
  document.querySelector('.edit-form').querySelector('input[name="display-name"]').placeholder = user.name;
  document.querySelector('.edit-form').querySelector('input[name="mail"]').placeholder = user.mail; 
}

export const getAvatarUrl = (event) => {
  const reader = new FileReader() 
  const file = event.target.files[0]; 
  reader.onload = () => {     
    reader.result;
  }
  reader.readAsDataURL(file)
  return URL.createObjectURL(file)
}

export const setNewUserInfo = (userAuth, profileButtons, editProfile, newAvatar) => {
  resetAlerts();
  const newName = document.querySelector('.edit-form').querySelector('input[name="display-name"]').value;
  const newMail = document.querySelector('.edit-form').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.edit-form').querySelector('input[name="password"]').value;
  validateUserPassword(userAuth, password)
  if(newName) validateName(newName) + updateUserName(userAuth, newName);
  if(newMail) validateMail(newMail) + updateUserMail(userAuth, newMail);
  newAvatar ? updateUserAvatar(userAuth, newAvatar) : setPredeterminateAvatar();
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, editProfile);
  clearForms();
}