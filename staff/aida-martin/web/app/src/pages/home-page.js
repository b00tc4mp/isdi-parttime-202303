import { context, show, hide, toggle } from "../ui.js";
import { loginPage } from "./login-page.js";
import errorShow from "../logic/helpers/error-managers.js";
import changePassword from "../logic/update-user-password.js";
import updateAvatar from "../logic/update-user-avatar.js";
import createPost from "../logic/create-post.js";
import retrievePosts from "../logic/retrieve-posts.js";

export const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.flaticon.com/512/3135/3135823.png";

export const homePage = document.querySelector(".home");
export const avatarImage = document.querySelector(".home-header-avatar");
export const profileLink = document.querySelector(".profile-link");
const profilePanel = document.querySelector(".profile");
const changePasswordForm = profilePanel.querySelector(".profile-password-form");
const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");
const changePasswordError = profilePanel.querySelector(
  ".change-password-error"
);
const changeAvatarError = profilePanel.querySelector(".update-avatar-error");

const addPostModal = homePage.querySelector(".modal");
const addPostForm = homePage.querySelector(".posts");
const addPostError = homePage.querySelector(".add-post-error");
const postsList = homePage.querySelector(".posts-list");

const bodyPage = document.querySelector("body");

profileLink.onclick = function (event) {
  event.preventDefault();

  toggle(profilePanel, postsList);
  changePasswordForm.reset();
  changeAvatarForm.reset();
  hide(changeAvatarError, changePasswordError);
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

  try {
    changePassword(context.userId, password, newPassword, newPasswordConfirm);

    hide(profilePanel, changeAvatarError, changePasswordError);
    show(postsList);
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

    homePage.querySelector("img").src = avatar;

    changePasswordForm.reset();
    changeAvatarForm.reset();
    hide(profilePanel, changeAvatarError, changePasswordError);
    show(postsList);
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

homePage.querySelector(".new-post-button").onclick = () => {
  show(addPostModal);

  bodyPage.classList.add("scroll-lock");
};

addPostForm.onsubmit = (event) => {
  event.preventDefault();

  const image = event.target.image.value;
  const text = event.target.text.value;

  try {
    createPost(context.userId, image, text);

    renderPosts();

    bodyPage.classList.remove("scroll-lock");
    hide(addPostModal);
  } catch (error) {
    errorShow(addPostError, error);
  }
};

homePage.querySelector(".cancel").onclick = (event) => {
  event.preventDefault();

  addPostForm.reset();

  bodyPage.classList.remove("scroll-lock");
  hide(addPostModal);
};

export function renderPosts() {
  try {
    const posts = retrievePosts(context.userId);

    console.log(posts);

    postsList.innerHTML = posts.reduce((accum, post) => {
      return (
        accum +
        `<article>
      <img class="post-image" src="${post.image}">
      <p>${post.text}</p>
      <time>${post.date.toLocaleString()}</time>
      </article>`
      );
    }, "");
  } catch (error) {
    alert(error.message);
  }
}
