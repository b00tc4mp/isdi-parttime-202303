import { toggleOff, clearForms, resetAlerts, setAlert, setPredeterminateAvatar, } from './general-tools.mjs';

import { updateUserAvatar, updateUserMail, updateUserName } from '../logic/update-user-data.mjs';

import { updateUserPassword } from '../logic/update-user-password.mjs';

import { retrieveUser } from '../logic/retrieve-user.mjs'

export const displayWelcome = (userAuth) => {
  const user = retrieveUser(userAuth);
  document.querySelector('.welcome').innerText = `Welcome to this app, ${user.name}`;
}

export const displayProfile = (userAuth) => {
  const user = retrieveUser(userAuth);
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
  updateUserPassword(userAuth, oldPassword, repeatPassword, newPassword);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, changePassword);
  clearForms();
};

export const setPlaceHolders = (userAuth) => {
  const user = retrieveUser(userAuth);
  document.querySelector('.edit-form').querySelector('input[name="display-name"]').placeholder = user.name;
  document.querySelector('.edit-form').querySelector('input[name="mail"]').placeholder = user.mail; 
}

export const setNewUserInfo = (userAuth, profileButtons, editProfile, newAvatar) => {
  resetAlerts();
  const newName = document.querySelector('.edit-form').querySelector('input[name="display-name"]').value;
  const newMail = document.querySelector('.edit-form').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.edit-form').querySelector('input[name="password"]').value;
  if(newName) updateUserName(userAuth, newName, password);
  if(newMail) updateUserMail(userAuth, newMail, password);
  newAvatar ? updateUserAvatar(userAuth, newAvatar, password) : setPredeterminateAvatar();
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, editProfile);
  clearForms();
}