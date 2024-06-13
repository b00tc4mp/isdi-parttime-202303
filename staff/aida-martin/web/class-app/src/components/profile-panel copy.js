import changePassword from "../logic/update-user-password.js";
import updateAvatar from "../logic/update-user-avatar.js";
import errorShow from "../logic/helpers/error-managers.js";
import { context, hide, show } from "../ui.js";
import Home from "../pages/home.js";

export default function initProfilePanel(
  homePage,
  avatarImage,
  renderPosts,
  postsList,
  newPostButtonContainer
) {
  const profilePanel = Home.querySelector(".profile");
  const changePasswordForm = profilePanel.querySelector(
    ".profile-password-form"
  );
  const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");
  const changePasswordError = profilePanel.querySelector(
    ".change-password-error"
  );
  const changeAvatarError = profilePanel.querySelector(".update-avatar-error");

  changePasswordForm.onsubmit = function (event) {
    event.preventDefault();

    const password = event.target.oldpassword.value;
    const newPassword = event.target.newpassword.value.trim();
    const newPasswordConfirm = event.target.repeatnewpassword.value.trim();

    try {
      changePassword(context.userId, password, newPassword, newPasswordConfirm);

      hide(profilePanel, changeAvatarError, changePasswordError);
      show(postsList, newPostButtonContainer);
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

    try {
      updateAvatar(context.userId, avatar);

      avatarImage.src = avatar;

      changePasswordForm.reset();
      changeAvatarForm.reset();
      hide(profilePanel, changeAvatarError, changePasswordError);
      show(postsList, newPostButtonContainer);

      renderPosts();
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
  return {
    profilePanel,
    changePasswordForm,
    changePasswordError,
    changeAvatarForm,
    changeAvatarError,
  };
}
