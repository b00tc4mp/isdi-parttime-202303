import { context, show, hide, toggle } from "../ui.js";
import { loginPage } from "./login-page.js";
import { findUserById } from "../logic/helpers/data-managers.js";
//import formatDate from "../logic/helpers/format-date.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import initProfilePanel from "../components/profile-panel.js";
import initAddPostPanel from "../components/add-post-panel.js";
import initEditPostPanel from "../components/edit-post-panel.js";

const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.flaticon.com/512/3135/3135823.png";

export const homePage = document.querySelector(".home");
const avatarImage = document.querySelector(".home-header-avatar");
const profileLink = document.querySelector(".profile-link");

const newPostButtonContainer = homePage.querySelector(
  ".button-new-post-container"
);
const newPostButton = homePage.querySelector(".new-post-button");

const {
  profilePanel,
  changePasswordForm,
  changePasswordError,
  changeAvatarForm,
  changeAvatarError,
} = initProfilePanel(homePage, avatarImage);
const addPostModal = initAddPostPanel(homePage, renderPosts);
const { editPostModal, editPostForm } = initEditPostPanel(
  homePage,
  renderPosts
);

const postsList = homePage.querySelector(".posts-list");

export const bodyPage = document.querySelector("body");

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

newPostButton.onclick = () => {
  show(addPostModal);

  bodyPage.classList.add("scroll-lock");
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
      date.innerText = post.date.toLocaleString("en-UK");

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
