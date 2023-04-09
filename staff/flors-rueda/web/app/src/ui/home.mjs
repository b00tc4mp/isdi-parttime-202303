import { toggleOff, setOn, setOff, clearForms, resetAlerts, setAlert, setPredeterminateAvatar,} from './general-tools.mjs';
import { updateUserAvatar, updateUserMail, updateName, updateUsername } from '../logic/update-user-data.mjs';
import { updateUserPassword } from '../logic/update-user-password.mjs';
import { retrieveUser } from '../logic/retrieve-user.mjs'
import { deleteAccount } from '../logic/delete-account.mjs';
import { getMail } from '../logic/users/data-managers.mjs';

export const displayWelcome = (userAuth) => {
  const user = retrieveUser(userAuth);
  document.querySelector('.welcome').innerText = `Welcome to this app, ${user.name}`;
}

export const displayProfile = (userAuth) => {
  const user = retrieveUser(userAuth);
  document.querySelector('.name').innerText = user.name;
  document.querySelector('.username').innerText = user.username;
  document.querySelector('.since').innerText = (user.joined).toLocaleDateString('en-GB');
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
  const mail = getMail(userAuth)
  document.querySelector('.edit-form').querySelector('input[name="display-name"]').placeholder = user.name;
  document.querySelector('.edit-form').querySelector('input[name="username"]').placeholder = user.username; 
  document.querySelector('.mail-form').querySelector('input[name="mail"]').placeholder = mail; 
}

export const setNewMail = (userAuth, profileButtons, editProfile) => {
  resetAlerts();
  const newMail = document.querySelector('.edit-mail').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.edit-mail').querySelector('input[name="password"]').value
  if(newMail) updateUserMail(userAuth, newMail, password);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, editProfile);
  clearForms();
}

export const setNewUserInfo = (userAuth, profileButtons, newAvatar) => {
  console.log(newAvatar)
  resetAlerts();
  const newName = document.querySelector('.edit-form').querySelector('input[name="display-name"]').value;
  const newUsername = document.querySelector('.edit-form').querySelector('input[name="username"]').value;
  const password = document.querySelector('.edit-form').querySelector('input[name="password"]').value;
  if(newName) updateName(userAuth, newName, password);
  if(newUsername) updateUsername(userAuth, newUsername, password);
  newAvatar ? updateUserAvatar(userAuth, newAvatar, password) : setPredeterminateAvatar();
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  setOn(profileButtons);
  clearForms();
}

export const setAlertUserDeleted = () => {
  const message = 'The account has been deleted. We will miss you!';
  setAlert('area-login', 'alert-warning', message);
}

export const deleteUser = (userAuth) => {
  const password = document.querySelector('.delete-form').querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('.delete-form').querySelector('input[name="repeat-password"]').value;
  deleteAccount(userAuth, password, repeatPassword);
}

export const cleanNewAvatarInput = (newAvatar) => {
  const deleteButton = document.querySelector('.edit-form').querySelector('.delete-img');
  const setAvatar = document.querySelector('.edit-form').querySelector('.set-avatar');
  clearForms();
  setOff(deleteButton);
  setOn(setAvatar);
  newAvatar = undefined
}