import { addOffClass, removeOffClass, toggleClass, context } from "../ui.js";
import { updateUserPassword } from '../logic/update-user-password.js'
import { updateUserAvatar } from '../logic/update-user-avatar.js'
import { createPost } from "../logic/create-post.js";
import { renderPost } from "../logic/render-post.js";

export const homePage = document.querySelector('.home')
export const loginPage = document.querySelector('.login')
export const createdPosts = homePage.querySelector('.created-posts')
const addPostPage = homePage.querySelector('.add-post')
const profilePanel = homePage.querySelector('.profile')
const changePasswordForm = profilePanel.querySelector('.change-password')
const changeAvatarForm = profilePanel.querySelector('.change-avatar')
const avatarImage = homePage.querySelector('.avatar-image')
const avatarUrl = profilePanel.querySelector('input[name="avatarUrl"]')
const avatarPassword = profilePanel.querySelector('input[name="password"]')
const addPostButton = homePage.querySelector('.add-post-button')
const cancelButton = homePage.querySelector('.cancel-button')
const addPostForm = homePage.querySelector('.add-post-form')


homePage.querySelector('.logout-button').onclick = function () {
  addOffClass(homePage, profilePanel)
  removeOffClass(loginPage)
  context.userId = null
  context.postId = null
  while(createdPosts.firstChild) createdPosts.removeChild(createdPosts.firstChild)
}

homePage.querySelector('a').onclick = function (event) {
  event.preventDefault()

  toggleClass(profilePanel)
  const inputsProfilePanel = profilePanel.querySelectorAll('input')
  inputsProfilePanel.forEach(input => input.value = '')
  avatarUrl.value = avatarImage.src
}

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

addPostButton.onclick = function () {
  removeOffClass(addPostPage)
}

addPostForm.onsubmit = function (e) {
  e.preventDefault()

  let postImageUrl = e.target.postImage.value
  let postText = e.target.postText.value

  try {
    createPost(context.userId, postImageUrl, postText)
    addOffClass(addPostPage)
    renderPost()
    addPostForm.reset()

  } catch (error) {
    if (error.name === 'Error') {
      alert(error.message);
    } else {
        alert('Sorry, something went wrong.')
        console.log(error);
    }
  }

}

cancelButton.onclick = function () {
  addOffClass(addPostPage)
}

