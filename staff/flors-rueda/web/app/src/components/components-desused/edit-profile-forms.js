import { controlUsernameInput,  } from '../ui/general-tools.js';
import { setOff, toggleOff, setPredeterminateAvatar,  getImgUrl } from '../ui/general-tools.js'
import { setNewPassword, setNewUserInfo, displayProfile, setNewMail, deleteUser, setAlertUserDeleted, cleanNewAvatarInput } from '../ui/home.js'
import { displayEditUserError } from '../ui/errors.js';
import { homePage } from '../pages/home-page.js';
import { logout, } from '../ui/login-register.js';
import { loginPage } from '../pages/login-page.js';

export default function initProfileForms(context, profile, profileForms, profileButtons) {
  const editProfile = document.querySelector('.edit-profile');
  const editForm = document.querySelector(".edit-form");
  const editUsername = document.querySelector(".edit-form").querySelector('input[name="username"]');
  const temporalAvatar = document.querySelector(".edit-form").querySelector('input[type="file"]');
  const deleteAvatar = document.querySelector(".edit-avatar").querySelector(".delete-img");
  const setAvatar = document.querySelector(".set-avatar");
  let newAvatar;

  editUsername.addEventListener("input", (event) => {
    controlUsernameInput(editUsername);
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      setNewUserInfo(context.userAuth, profileButtons, newAvatar);
      displayProfile(context.userAuth);
      setOff(deleteAvatar, setAvatar, editProfile, profileForms);
      cleanNewAvatarInput(newAvatar);
    } catch (error) {
      displayEditUserError(error.message);
    }
  });

  temporalAvatar.addEventListener("change", (event) => {
    try {
      const avatar = document.querySelector(".avatar");
      toggleOff(deleteAvatar, setAvatar);
      getImgUrl(event, (imageUrl) => {
        newAvatar = imageUrl;
        avatar.src = newAvatar;
      });
    } catch (error) {
      console.error(error);
    }
  });

  deleteAvatar.addEventListener("click", (event) => {
    event.preventDefault();
    newAvatar = undefined;
    temporalAvatar.value = "";
    setPredeterminateAvatar(context.userAuth);
    toggleOff(deleteAvatar, setAvatar);
    displayProfile(context.userAuth);
  });

  const changePassword = document.querySelector('.change-password');
  const passwordForm = document.querySelector('.password-form');

  passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      setNewPassword(context.userAuth, profileButtons, changePassword);
      setOff(profileForms, changePassword);
      displayProfile(context.userAuth);
    } catch (error) { }
  });

  const editMail = document.querySelector('.edit-mail');
  const mailForm = document.querySelector('.mail-form');

  mailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      setNewMail(context.userAuth, profileButtons, editProfile);
      setOff(profileForms, editMail);
      displayProfile(context.userAuth);
    } catch (error) {
    }
  });



  return { editProfile, editMail, changePassword, deleteAccount, setAvatar, deleteAvatar }

}
