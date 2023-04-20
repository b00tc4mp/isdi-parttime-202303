import { context, show, hide, toggle } from "../ui.js";
import { loginPage } from "./login-page.js";
import { findUserById } from "../logic/helpers/data-managers.js";
//import formatDate from "../logic/helpers/format-date.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import initProfilePanel from "../components/profile-panel.js";
import initAddPostPanel from "../components/add-post-panel.js";
import initEditPostPanel from "../components/edit-post-panel.js";
import { isLiked } from "../logic/liked-post.js";

const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.flaticon.com/512/219/219989.png";
const DEFAULT_LIKES_ICON_URL =
  "https://cdn-icons-png.flaticon.com/512/1077/1077086.png";

export const homePage = document.querySelector(".home");
const avatarImage = document.querySelector(".home-header-avatar");
const profileLink = document.querySelector(".profile-link");

const newPostButtonContainer = homePage.querySelector(
  ".button-new-post-container"
);
const newPostButton = homePage.querySelector(".new-post-button");

const postsList = homePage.querySelector(".posts-list");

const {
  profilePanel,
  changePasswordForm,
  changePasswordError,
  changeAvatarForm,
  changeAvatarError,
} = initProfilePanel(
  homePage,
  avatarImage,
  renderPosts,
  postsList,
  newPostButtonContainer
);
const addPostModal = initAddPostPanel(homePage, renderPosts);
const { editPostModal, editPostForm } = initEditPostPanel(
  homePage,
  renderPosts
);

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

  document.body.classList.add("scroll-lock");
};

export function renderPosts() {
  try {
    const posts = retrievePosts(context.userId);

    postsList.innerHTML = "";

    posts.forEach((post) => {
      const postItem = document.createElement("article");
      const user = findUserById(post.author);

      const userContainer = document.createElement("div");
      userContainer.classList.add("user-container-post");

      const name = document.createElement("p");
      name.classList.add("post-user");
      name.innerText = user.name;

      const avatar = document.createElement("img");
      avatar.classList.add("post-avatar");

      userContainer.append(avatar, name);

      if (
        user.avatar
          ? (avatar.src = user.avatar)
          : (avatar.src = DEFAULT_AVATAR_URL)
      );

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container-post");

      const image = document.createElement("img");
      image.classList.add("post-image");
      image.src = post.image;

      imageContainer.append(image);

      const likesIcon = document.createElement("img");
      likesIcon.classList.add("likes-icon");
      likesIcon.src = "https://cdn-icons-png.flaticon.com/512/1077/1077086.png";

      likesIcon.onclick = () => {
        if (isLiked(likesIcon, DEFAULT_LIKES_ICON_URL)) {
          likesIcon.src = DEFAULT_LIKES_ICON_URL;
          return;
        }
        likesIcon.src =
          "https://cdn-icons-png.flaticon.com/512/1216/1216686.png";
      };

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
          document.body.classList.add("scroll-lock");
        };

        postItem.append(
          userContainer,
          imageContainer,
          likesIcon,
          date,
          text,
          button
        );
      } else {
        postItem.append(userContainer, imageContainer, likesIcon, date, text);
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
