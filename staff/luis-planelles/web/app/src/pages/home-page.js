import { context, show, hide, toggle } from '../ui.js';
import updateUserPassword from '../logic/update-user-password.js';
import loginPage from './login-page.js';
import updateUserAvatar from '../logic/update-user-avatar.js';
import DEFAULT_AVATAR_URL from '../logic/helpers/global-variables.js';

const homePage = document.querySelector('.home');
const avatarImage = homePage.querySelector('.home-header-avatar');

const homeLinks = homePage.querySelectorAll('a');
const profileLink = homeLinks[1];
const goHome = homeLinks[0];

const profilePanel = homePage.querySelector('.profile');
const updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form');
const updateUserPasswordForm = profilePanel.querySelector(
  '.profile-password-form'
);

homePage.querySelector('.home-header-logout').onclick = () => {
  context.userId = null;
  avatarImage.src = DEFAULT_AVATAR_URL;

  hide(homePage, profilePanel);
  show(loginPage);
};

goHome.onclick = (event) => {
  event.preventDefault();

  hide(profilePanel);
  show(homePage);
};

profileLink.onclick = (event) => {
  event.preventDefault();

  toggle(profilePanel);
};

updateUserAvatarForm.onsubmit = (event) => {
  event.preventDefault();

  const url = event.target.url.value;

  try {
    updateUserAvatar(context.userId, url);

    alert('avatar updated');

    avatarImage.src = url;

    updateUserAvatarForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

updateUserPasswordForm.onsubmit = (event) => {
  event.preventDefault();

  const password = event.target.password.value;
  const newPassword = event.target.newPassword.value;
  const newPasswordConfirm = event.target.newPasswordConfirm.value;

  try {
    updateUserPassword(
      context.userId,
      password,
      newPassword,
      newPasswordConfirm
    );

    alert('password updated');

    updateUserPasswordForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

export { homePage, avatarImage, profileLink };
