import { Component } from "../library/composito.js";
import { context } from "../ui.js";
import updateUserPassword from "../logic/update-user-password.js";
import updateUserAvatar from "../logic/update-user-avatar.js";
import { findUserById } from "../logic/helpers/data-manager.js";

export default class Profile extends Component {
  constructor() {
    super(`<div class="profile page">
      <form class="change-avatar change-form">
          <h2>Update avatar</h2>
          <div>
              <input class="input" type="url" name="avatarUrl" placeholder="avatar url">
              <input class="input" type="password" name="password" placeholder="password">
              <button class="button">Update</button>
          </div>
      </form>
      <form class="change-password change-form">
          <h2>Update password</h2>
          <div>
              <input class="input" type="password" name="password" placeholder="password">
              <input class="input" type="password" name="newPassword" placeholder="new password">
              <input class="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation">
              <button class="button">Update</button>
          </div>
      </form>
      <button class="close-changeform-button">Close</button>
  </div>`)

    const user = findUserById(context.userId)
    const avatarUrl = this.container.querySelector('input[name="avatarUrl"]')
    avatarUrl.value = user.avatar
    
    const changeAvatarForm = this.container.querySelector('.change-avatar')
    changeAvatarForm.onsubmit = (event) => {
      event.preventDefault();
    
      let newAvatarUrl = event.target.avatarUrl.value;
      let password = event.target.password.value;
    
      try {
          updateUserAvatar(context.userId, newAvatarUrl, password)
    
          this.removeProfile()
          changeAvatarForm.reset()
          this.changeAvatarImage()
          alert('Avatar updated.')
    
      } catch (error) {
          if (error.name === 'Error') {
              alert(error.message);
          } else {
              alert('Sorry, something went wrong.')
              console.log(error);
          }
      }
    }

    const changePasswordForm = this.container.querySelector('.change-password')
    changePasswordForm.onsubmit = (event) => {
      event.preventDefault();
    
      let password = event.target.password.value;
      let newPassword = event.target.newPassword.value;
      let newPasswordComfirm = event.target.newPasswordConfirm.value;
    
      try {
          updateUserPassword(context.userId, password, newPassword, newPasswordComfirm)
    
          this.removeProfile()
          changePasswordForm.reset()
          alert('Password updated.')
    
    
      } catch (error) {
          if (error.name === 'Error') {
              alert(error.message);
          } else {
              alert('Sorry, something went wrong.')
              console.log(error);
          }
      }
    }

    this.container.querySelector('.close-changeform-button').onclick = () => {
      this.removeProfile()
      this.container.querySelectorAll('input').forEach(input => input.value = '')
      avatarUrl.value = user.avatar
    }
  }

  removeProfile() {
    throw new Error('not overriden')
  }

  changeAvatarImage() {
    throw new Error('not overriden')
  }
}
