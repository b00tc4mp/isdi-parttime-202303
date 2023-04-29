import {
  createLikesCount,
  createLikesUsers,
} from '../components/add-like-info.js';
import initEditPostPanel from '../components/edit-post-panel.js';
import renderPostFavourite from '../components/helpers/render-favourite.js';
import {
  renderLikeButton,
  renderLikesInfo,
} from '../components/helpers/render-like.js';
import retrieveAvatar from '../logic/retrieve-avatar.js';
import retrievePosts from '../logic/retrieve-posts.js';
import retrieveUser from '../logic/retrieve-user.js';
import { context } from '../ui.js';
import getHomePage from './helpers/get-home-page.js';

const homePage = getHomePage(),
  postListPanel = homePage.querySelector('.post-list');

const createAuthorElement = (post) => {
  const author = document.createElement('p');
  author.classList.add('post-author');
  author.innerText = post.authorName;

  return author;
};

const createAvatarElement = (post) => {
  const avatarAuthor = retrieveAvatar(post.author),
    avatar = document.createElement('img');
  avatar.classList.add('post-avatar');
  avatar.src = avatarAuthor;

  return avatar;
};

const createEditButton = (post) => {
  const buttonEdit = document.createElement('button'),
    editIcon = document.createElement('i');

  editIcon.classList.add('far', 'fa-pen');
  buttonEdit.classList.add('button-edit');
  buttonEdit.appendChild(editIcon);

  buttonEdit.onclick = () => initEditPostPanel(homePage, post);

  return buttonEdit;
};

const renderPostHeader = (post) => {
  const postHeader = document.createElement('div');
  postHeader.classList.add('post-header');

  const author = createAuthorElement(post),
    avatar = createAvatarElement(post);

  if (post.author === context.userId) {
    const buttonEdit = createEditButton(post);
    postHeader.append(avatar, author, buttonEdit);
  } else {
    postHeader.append(avatar, author);
  }

  return postHeader;
};

const createPostImage = (post) => {
  const image = document.createElement('img');
  image.classList.add('post-image');
  image.src = post.image;

  return image;
};

const renderPostImageFooter = (post, likesCount, likesUsers) => {
  const postImageFooter = document.createElement('div');
  postImageFooter.classList.add('post-image-footer');

  const postLikeButton = renderLikeButton(post, likesCount, likesUsers),
    postFavoriteButton = renderPostFavourite(post, context.userId);

  postImageFooter.append(postLikeButton, postFavoriteButton);

  return postImageFooter;
};

const createPostText = (post) => {
  const text = document.createElement('p');
  text.classList.add('post-text');
  text.innerText = post.text;

  return text;
};

const createPostDate = (post) => {
  const date = document.createElement('time');
  date.innerText = post.date.toLocaleString('en-ES');

  return date;
};

const renderPostItem = (post) => {
  const postItem = document.createElement('article');
  postItem.classList.add('posts-users');

  const likesUsers = createLikesUsers(post),
    likesCount = createLikesCount(post);

  const postHeader = renderPostHeader(post),
    postImage = createPostImage(post),
    postText = createPostText(post),
    postImageFooter = renderPostImageFooter(post, likesCount, likesUsers),
    postLikesInfo = renderLikesInfo(likesCount, likesUsers),
    postDate = createPostDate(post);

  postItem.append(
    postHeader,
    postImage,
    postImageFooter,
    postLikesInfo,
    postText,
    postDate
  );

  return postItem;
};

const renderPosts = () => {
  try {
    const posts = retrievePosts(context.userId),
      user = retrieveUser(context.userId);

    postListPanel.innerHTML = '';

    for (const post of posts) {
      const postItem = renderPostItem(post, user);

      postListPanel.append(postItem);
    }

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export default renderPosts;
