import { toggleOff, setOn, setOff, clearForms, resetAlerts, setAlert, setPredeterminateAvatar,} from './general-tools.mjs';
import { updateUserAvatar, updateUserMail, updateName, updateUsername } from '../logic/update-user-data.mjs';
import { updateUserPassword } from '../logic/update-user-password.mjs';
import { retrieveUser } from '../logic/retrieve-user.mjs'
import { deleteAccount } from '../logic/delete-account.mjs';
import { getMail } from '../logic/users/data-managers.mjs';
import { getPostsSorted } from '../logic/posts/data-managers.mjs';
import { uploadPost } from '../logic/upload-post.mjs';
import { updatePost } from '../logic/update-post.mjs';

export const displayWelcome = (userAuth) => {
  const user = retrieveUser(userAuth);
  document.querySelector('.welcome').innerText = `Welcome, ${user.name}! Check what's going on:`;
}

export const displayProfile = (userAuth) => {
  const user = retrieveUser(userAuth);
  document.querySelector('.name').innerText = user.name;
  document.querySelector('.username').innerText = user.username;
  document.querySelector('.since').innerText = (user.joined).toLocaleDateString('en-GB');
  user.avatar ? setPredeterminateAvatar(userAuth) : setPredeterminateAvatar();
}

export const setNewPassword = (userAuth, profileButtons, changePassword) => {
  resetAlerts();
  const newPassword = document.querySelector('.password-form').querySelector('input[name="new-password"]').value;
  const repeatPassword = document.querySelector('.password-form').querySelector('input[name="repeat-new-password"]').value;
  const oldPassword = document.querySelector('.password-form').querySelector('input[name="password"]').value;
  updateUserPassword(userAuth, oldPassword, repeatPassword, newPassword);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, changePassword);
  clearForms();
};

export const setPlaceHolders = (userAuth) => {
  const user = retrieveUser(userAuth);
  const mail = getMail(userAuth)
  document.querySelector('.edit-form').querySelector('input[name="display-name"]').placeholder = user.name;
  document.querySelector('.edit-form').querySelector('input[name="username"]').placeholder = user.username; 
  document.querySelector('.mail-form').querySelector('input[name="mail"]').placeholder = mail; 
}

export const setNewMail = (userAuth, profileButtons, editProfile) => {
  resetAlerts();
  const newMail = document.querySelector('.edit-mail').querySelector('input[name="mail"]').value;
  const password = document.querySelector('.edit-mail').querySelector('input[name="password"]').value
  if(newMail) updateUserMail(userAuth, newMail, password);
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  toggleOff(profileButtons, editProfile);
  clearForms();
}

export const setNewUserInfo = (userAuth, profileButtons, newAvatar) => {
  resetAlerts();
  const newName = document.querySelector('.edit-form').querySelector('input[name="display-name"]').value;
  const newUsername = document.querySelector('.edit-form').querySelector('input[name="username"]').value;
  const password = document.querySelector('.edit-form').querySelector('input[name="password"]').value;
  if(newName) updateName(userAuth, newName, password);
  if(newUsername) updateUsername(userAuth, newUsername, password);
  newAvatar ? updateUserAvatar(userAuth, newAvatar, password) : setPredeterminateAvatar();
  const message = 'Changes saved successfully!';
  setAlert('area-profile', 'alert-success', message);
  setOn(profileButtons);
  clearForms();
}

export const setAlertUserDeleted = () => {
  const message = 'The account has been deleted. We will miss you!';
  setAlert('area-login', 'alert-warning', message);
}

export const deleteUser = (userAuth) => {
  const password = document.querySelector('.delete-form').querySelector('input[name="password"]').value;
  const repeatPassword = document.querySelector('.delete-form').querySelector('input[name="repeat-password"]').value;
  deleteAccount(userAuth, password, repeatPassword);
}

export const cleanNewAvatarInput = (newAvatar) => {
  const deleteButton = document.querySelector('.edit-form').querySelector('.delete-img');
  const setAvatar = document.querySelector('.edit-form').querySelector('.set-avatar');
  clearForms();
  setOff(deleteButton);
  setOn(setAvatar);
  newAvatar = undefined
}

//TODO: add validators to print post, plus try catch -> validate user is logged, 

export const openModal = (modal, previousPost) => {
  const blur = document.querySelector('.blur');
  setOn(modal, blur);

  const selectedNewPostImg = document.querySelector('.new-post-image');
  const newPostTextInput = document.querySelector('.new-post-form').querySelector('input[name="post-text"]');
  const sendPost = document.querySelector('.new-post-form')

  if(previousPost) {
    console.log(previousPost)
    selectedNewPostImg.src = previousPost.image;
    newPostTextInput.value = previousPost.text;
    sendPost.addEventListener('submit', (event) => {
      event.preventDefault(); 
      updatePost(previousPost, newPostTextInput.value, selectedNewPostImg.src)
      post(newPostImg, newPostText, context.userAuth, postModal)
      clearForms();
      temporalNewPostImg.value = '';
      selectedNewPostImg.src = 'https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png';
      setOn(setNewPostImg)
    })
  }

};

export const closeModal  = (modal) => {
  const blur = document.querySelector('.blur');
  setOff(modal, blur);
};

const getPostHTML = (post, userAuth) => {
  const postAuthor = retrieveUser(post.author)
  let html = `<article class="post">
                <div class="post-author-data">
                <img class="post-author-avatar" src="${postAuthor.avatar}" />
                <p class="post-author-name">${postAuthor.name}</p>
                <p class="post-author-username">${postAuthor.username}</p>
              </div>
              <div class="post-main-data">
                <img class="post-image" src="${post.image}" />
                <p class="post-text">${post.text}</p>
              </div>
              <div class="post-stats-data">`
  let timeDifference = new Date() - post.date
  const hours = Math.floor(timeDifference / 3600000)
  if (hours <= 24){
    const minutes = Math.floor(timeDifference / 60000)
    if(hours > 0) html += `<time class="post-date">${hours} hours ago</time>`
    if(hours === 0 && minutes > 0) html += `<time class="post-date">${minutes} minutes ago</time>`
    if(minutes === 0) html += `<time class="post-date">just now</time>`
  } else {
    html += `<time class="post-date">${post.date.toLocaleDateString('en-GB')}</time>`
  }
  if(post.author === userAuth) {
    html += `<svg class="to-edit-post ${post.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M180 1044q-24 0-42-18t-18-42V384q0-24 18-42t42-18h405l-60 60H180v600h600V636l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360V634l302-302Zm171 168L662 332l100-100q17-17 42.311-17T847 233l84 85q17 18 17 42.472T930 402l-97 98Z"/></svg>
    </div></article>`
  } else {
    html += `</div></article>`
  }
  return html
}

export const renderPosts = (userAuth, postModal) => {
  const posts = getPostsSorted();
  const postList = document.querySelector('.posts-display');
  postList.innerHTML = '';
  posts.forEach((post) => {
    postList.innerHTML += getPostHTML(post, userAuth)
  })
  return document.querySelectorAll('.to-edit-post')
}

export const post = (postImg, postText, userAuth, postModal) => {
  uploadPost(postImg, postText, userAuth);
  closeModal(postModal);
  renderPosts(userAuth, postModal);
}

