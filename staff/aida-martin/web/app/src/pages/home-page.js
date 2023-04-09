import { context, show, hide, toggle } from "../ui.js";
import { loginPage } from "./login-page.js";
import errorShow from "../logic/helpers/error-managers.js";
import changePassword from "../logic/update-user-password.js";
import updateAvatar from "../logic/update-user-avatar.js";

export const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.flaticon.com/512/3135/3135823.png";

export const homePage = document.querySelector(".home");
export const avatarImage = document.querySelector(".home-header-avatar");
export const profileLink = document.querySelector(".profile-link");
const profilePanel = document.querySelector(".profile");
const changePasswordForm = profilePanel.querySelector(".profile-password-form");
const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");

profileLink.onclick = function (event) {
  event.preventDefault();

  toggle(profilePanel);
};

homePage.querySelector(".profile-logout-button").onclick = function () {
  context.userId = null;
  avatarImage.src = DEFAULT_AVATAR_URL;

  hide(homePage, profilePanel);
  show(loginPage);
};

changePasswordForm.onsubmit = function (event) {
  event.preventDefault();

  const password = event.target.oldpassword.value;
  const newPassword = event.target.newpassword.value.trim();
  const newPasswordConfirm = event.target.repeatnewpassword.value.trim();
  const changePasswordError = profilePanel.querySelector(
    ".change-password-error"
  );

  try {
    changePassword(context.userId, password, newPassword, newPasswordConfirm);

    hide(profilePanel);
    changePasswordForm.reset();
    changeAvatarForm.reset();
  } catch (error) {
    changePasswordForm.reset();
    changeAvatarForm.reset();

    if (error.message.includes("User ID")) {
      hide(profilePanel, homePage);
      show(loginPage);
      return;
    }
    errorShow(changePasswordError, error);
  }
};

changeAvatarForm.onsubmit = function (event) {
  event.preventDefault();

  const avatar = event.target.url.value;
  const changeAvatarError = profilePanel.querySelector(".update-avatar-error");

  try {
    updateAvatar(context.userId, avatar);

    homePage.querySelector("img").src = avatar;

    changePasswordForm.reset();
    changeAvatarForm.reset();
    hide(profilePanel);
    show(homePage);
  } catch (error) {
    changePasswordForm.reset();
    changeAvatarForm.reset();

    if (error.message.includes("User ID")) {
      hide(profilePanel, homePage);
      show(loginPage);
      return;
    }
    errorShow(changeAvatarError, error);
  }
};
