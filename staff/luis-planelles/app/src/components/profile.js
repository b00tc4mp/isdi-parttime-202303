import { Component } from '../library/composito.js';
import updateUserAvatar from '../logic/update-user-avatar.js';
import updateUserPassword from '../logic/update-user-password.js';
import { context } from '../ui.js';

class Profile extends Component {
  constructor() {
    super(`
  <section class="profile container">
        <h2>Update avatar</h2>

        <form class="profile-avatar-form">
          <input class="input" type="url" name="url" />
          <button class="button" type="submit">Update</button>
        </form>

        <h2>Update password</h2>

        <form class="profile-password-form">
          <input class="input" type="password" name="password" placeholder="password"/>
          <input class="input" type="password" name="newPassword" placeholder="new password"/>
          <input class="input" type="password" name="newPasswordConfirm" placeholder="password confirmation"/>
          <button class="button" type="submit">Update</button>
        </form>
      </section>`);

    const profileAvatarForm = this.container.querySelector(
        '.profile-avatar-form'
      ),
      profilePasswordForm = this.container.querySelector(
        '.profile-password-form'
      );

    this.container.querySelector('.profile-avatar-form').onsubmit = (event) => {
      event.preventDefault();

      const url = event.target.url.value;

      try {
        updateUserAvatar(context.userId, url);

        alert('avatar updated');

        profileAvatarForm.reset();
      } catch (error) {
        alert(error.message);
      }
    };

    profilePasswordForm.onsubmit = (event) => {
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

        profilePasswordForm.reset();
      } catch (error) {
        alert(error.message);
      }
    };
  }
}

export default Profile;
