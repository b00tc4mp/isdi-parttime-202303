import { Component } from "../library/composito.js";
import changePassword from "../logic/update-user-password.js";
import updateAvatar from "../logic/update-user-avatar.js";
import errorShow from "../logic/helpers/error-managers.js";
import { context, hide, show } from "../ui.js";

class ProfilePanel extends Component {
  constructor() {
    super(`<div class="profile">
    <h1 class="title">YOUR PROFILE</h1>

    <form class="form profile-avatar-form">
      <h2>UPDATE AVATAR</h2>
      <input class="input" type="url" name="url" placeholder="Your link" />

      <p class="update-avatar-error error off"></p>

      <button class="button change-avatar-button" type="submit">
        UPDATE
      </button>
    </form>

    <form class="form profile-password-form">
      <h2>UPDATE PASSWORD</h2>
      <input
        class="input"
        type="password"
        name="oldpassword"
        placeholder="Current password"
      />

      <input
        class="input"
        type="password"
        name="newpassword"
        placeholder="New password"
      />

      <input
        class="input"
        type="password"
        name="repeatnewpassword"
        placeholder="Repeat new password"
      />

      <p class="change-password-error error off"></p>

      <button class="button change-password-button">UPDATE</button>
    </form>
  </div>`);
  }

  //   initProfilePanel(
  //     homePage,
  //     avatarImage,
  //     renderPosts,
  //     postsList,
  //     newPostButtonContainer
  //   ) {
  //     const profilePanel = Home.querySelector(".profile");
  //     const changePasswordForm = profilePanel.querySelector(
  //       ".profile-password-form"
  //     );
  //     const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");
  //     const changePasswordError = profilePanel.querySelector(
  //       ".change-password-error"
  //     );
  //     const changeAvatarError = profilePanel.querySelector(
  //       ".update-avatar-error"
  //     );

  //     changePasswordForm.onsubmit = function (event) {
  //       event.preventDefault();

  //       const password = event.target.oldpassword.value;
  //       const newPassword = event.target.newpassword.value.trim();
  //       const newPasswordConfirm = event.target.repeatnewpassword.value.trim();

  //       try {
  //         changePassword(
  //           context.userId,
  //           password,
  //           newPassword,
  //           newPasswordConfirm
  //         );

  //         hide(profilePanel, changeAvatarError, changePasswordError);
  //         show(postsList, newPostButtonContainer);
  //         changePasswordForm.reset();
  //         changeAvatarForm.reset();
  //       } catch (error) {
  //         changePasswordForm.reset();
  //         changeAvatarForm.reset();

  //         if (error.message.includes("User ID")) {
  //           hide(profilePanel, homePage);
  //           show(loginPage);
  //           return;
  //         }
  //         errorShow(changePasswordError, error);
  //       }
  //     };

  //     changeAvatarForm.onsubmit = function (event) {
  //       event.preventDefault();

  //       const avatar = event.target.url.value;

  //       try {
  //         updateAvatar(context.userId, avatar);

  //         avatarImage.src = avatar;

  //         changePasswordForm.reset();
  //         changeAvatarForm.reset();
  //         hide(profilePanel, changeAvatarError, changePasswordError);
  //         show(postsList, newPostButtonContainer);

  //         renderPosts();
  //       } catch (error) {
  //         changePasswordForm.reset();
  //         changeAvatarForm.reset();

  //         if (error.message.includes("User ID")) {
  //           hide(profilePanel, homePage);
  //           show(loginPage);
  //           return;
  //         }
  //         errorShow(changeAvatarError, error);
  //       }
  //     };
  //     return {
  //       profilePanel,
  //       changePasswordForm,
  //       changePasswordError,
  //       changeAvatarForm,
  //       changeAvatarError,
  //     };
  //   }
}
