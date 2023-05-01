import { Component } from "../library/composito.js";
import { users } from "../data.js";
import { context } from "../ui.js";

export default class Profile extends Component {
  constructor() {
    super(`<div class="profile page off">
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
  
    this.container.querySelector('.change-avatar').onsubmit = function (event) {
      event.preventDefault();
    
      let password = event.target.password.value;
      let newPassword = event.target.newPassword.value;
      let newPasswordComfirm = event.target.newPasswordConfirm.value;
    
      try {
          // updateUserPassword(context.userId, password, newPassword, newPasswordComfirm)
    
          this.removeProfile()
          addOffClass(profilePanel)
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
  
    this.container.querySelector('.change-password').onsubmit = function (event) {
      event.preventDefault();
    
      let newAvatarUrl = event.target.avatarUrl.value;
      let password = event.target.password.value;
    
      try {
          updateUserAvatar(context.userId, newAvatarUrl, password)
    
          this.removeProfile()
          this.container.querySelector('input[name="password"]')
          avatarPassword.value = ''
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
  
    this.container.querySelector('.close-changeform-button').onclick = function () {
      this.removeProfile()
      const inputsProfilePanel = this.container.querySelectorAll('input')
      inputsProfilePanel.forEach(input => input.value = '')
      // avatarUrl.value = avatarImage.src
    }
  }

  removeProfile() {
    throw new Error('not overriden')
  }
}