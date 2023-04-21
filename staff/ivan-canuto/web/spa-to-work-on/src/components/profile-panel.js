import { updateUserPassword } from '../logic/update-user-password.js'
import { updateUserAvatar } from '../logic/update-user-avatar.js'
import { context, addOffClass } from '../ui.js'

export default function initProfilePanel(homePage, avatarImage) {
  const profilePanel = homePage.querySelector('.profile')
  const changePasswordForm = profilePanel.querySelector('.change-password')
  const changeAvatarForm = profilePanel.querySelector('.change-avatar')
  const avatarPassword = profilePanel.querySelector('input[name="password"]')
  const avatarUrl = profilePanel.querySelector('input[name="avatarUrl"]')

  changePasswordForm.onsubmit = function (event) {
    event.preventDefault();
  
    let password = event.target.password.value;
    let newPassword = event.target.newPassword.value;
    let newPasswordComfirm = event.target.newPasswordConfirm.value;
  
    try {
        updateUserPassword(context.userId, password, newPassword, newPasswordComfirm)
  
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

  changeAvatarForm.onsubmit = function (event) {
    event.preventDefault();
  
    let newAvatarUrl = event.target.avatarUrl.value;
    let password = event.target.password.value;
  
    try {
        updateUserAvatar(context.userId, newAvatarUrl, password)
  
        addOffClass(profilePanel)
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

  profilePanel.querySelector('.close-changeform-button').onclick = function () {
    addOffClass(profilePanel)
    const inputsProfilePanel = profilePanel.querySelectorAll('input')
    inputsProfilePanel.forEach(input => input.value = '')
    avatarUrl.value = avatarImage.src
  }

  return profilePanel
}
