import { context, show, hide, toggle } from "../ui.js";
import { loginPage } from "./login-page.js";
import { findUserById } from "../logic/helpers/data-managers.js";
import errorShow from "../logic/helpers/error-managers.js";
import formatDate from "../logic/helpers/format-date.js";
import changePassword from "../logic/update-user-password.js";
import updateAvatar from "../logic/update-user-avatar.js";
import createPost from "../logic/create-post.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import updatePosts from "../logic/update-posts.js";

const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.flaticon.com/512/3135/3135823.png";

export const homePage = document.querySelector(".home");
const avatarImage = document.querySelector(".home-header-avatar");
const profileLink = document.querySelector(".profile-link");
const profilePanel = document.querySelector(".profile");
const changePasswordForm = profilePanel.querySelector(".profile-password-form");
const changeAvatarForm = profilePanel.querySelector(".profile-avatar-form");
const changePasswordError = profilePanel.querySelector(
  ".change-password-error"
);
const changeAvatarError = profilePanel.querySelector(".update-avatar-error");

const newPostButtonContainer = homePage.querySelector(
  ".button-new-post-container"
);
const newPostButton = homePage.querySelector(".new-post-button");
const addPostModal = homePage.querySelector(".modal");
const addPostForm = homePage.querySelector(".posts");
const addPostError = homePage.querySelector(".add-post-error");
const postsList = homePage.querySelector(".posts-list");
const editPostModal = homePage.querySelector(".edit-post-modal");
const editPostForm = homePage.querySelector(".edit-post-form");
const editPostError = homePage.querySelector(".edit-post-error");

const bodyPage = document.querySelector("body");

profileLink.onclick = function (event) {
  event.preventDefault();

  toggle(profilePanel, postsList, newPostButtonContainer);
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

    homePage.querySelector("img").src = avatar;

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

newPostButton.onclick = () => {
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

    addPostForm.reset();

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

editPostForm.onsubmit = (event) => {
  event.preventDefault();

  const post = event.target.postId.value;
  const image = event.target.image.value;
  const text = event.target.text.value;

  try {
    updatePosts(context.userId, post, image, text);

    renderPosts();

    editPostForm.reset();

    bodyPage.classList.remove("scroll-lock");
    hide(editPostModal);
  } catch (error) {
    errorShow(editPostError, error);
  }
};

editPostForm.querySelector(".cancel").onclick = (event) => {
  event.preventDefault();

  editPostForm.reset();

  bodyPage.classList.remove("scroll-lock");
  hide(editPostModal);
};

export function renderPosts() {
  try {
    const posts = retrievePosts(context.userId);

    postsList.innerHTML = "";

    posts.forEach((post) => {
      const postItem = document.createElement("article");
      const user = findUserById(post.author);

      const name = document.createElement("p");
      name.classList.add("post-user");
      name.innerText = user.name;

      const avatar = document.createElement("img");
      avatar.classList.add("post-avatar");

      if (
        user.avatar
          ? (avatar.src = user.avatar)
          : (avatar.src = DEFAULT_AVATAR_URL)
      );

      const image = document.createElement("img");
      image.classList.add("post-image");
      image.src = post.image;

      const text = document.createElement("p");
      text.classList.add("post-text");
      text.innerText = post.text;

      const date = document.createElement("time");
      date.classList.add("post-date");
      date.innerText = formatDate(post.date);

      if (post.author === context.userId) {
        const button = document.createElement("button");
        button.classList.add("edit-post-button");
        button.classList.add("button");
        button.innerText = "EDIT";

        button.onclick = () => {
          editPostForm.querySelector("input[type=hidden]").value = post.id;
          editPostForm.querySelector("input[type=url").value = post.image;
          editPostForm.querySelector("textarea").value = post.text;

          show(editPostModal);
        };

        postItem.append(image, name, avatar, date, text, button);
      } else {
        postItem.append(image, name, avatar, date, text);
      }

      postsList.appendChild(postItem);
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function renderUser() {
  try {
    const user = retrieveUser(context.userId);

    profileLink.innerText = user.name;

    avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL;

    return true;
  } catch (error) {
    return false;
  }
}
