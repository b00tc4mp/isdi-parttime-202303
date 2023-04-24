import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';

import initEditPostPanel from '../components/edit-post-panel.js';
import retrieveAvatar from '../logic/retrive-avatar.js';
import retrieveUser from '../logic/retrieve-user.js';
import getHomePage from '../components/get-home-page.js';
import renderPostLikesInfo from '../components/likes-post-info.js';

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
  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('button-edit');
  buttonEdit.innerText = 'Edit';
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

const createPostText = (post) => {
  const text = document.createElement('p');
  text.classList.add('post-text');
  text.innerText = post.text;

  return text;
};

const renderPostItem = (post, user) => {
  const postItem = document.createElement('article');
  postItem.classList.add('posts-users');

  const postHeader = renderPostHeader(post),
    postImage = createPostImage(post),
    postText = createPostText(post),
    postLikesInfo = renderPostLikesInfo(post, user);

  postItem.append(postHeader, postImage, postLikesInfo, postText);

  return postItem;
};

const renderPosts = () => {
  try {
    const posts = retrievePosts(context.userId),
      user = retrieveUser(context.userId);

    postListPanel.innerHTML = '';

    posts.forEach((post) => {
      const postItem = renderPostItem(post, user);

      const date = document.createElement('time');
      date.innerText = post.date.toLocaleString('en-ES');
      postItem.append(date);

      postListPanel.append(postItem);
    });

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export default renderPosts;
