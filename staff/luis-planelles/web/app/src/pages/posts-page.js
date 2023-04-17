import createPost from '../logic/create-posts.js';
import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';
import { show, hide } from '../ui.js';
import { getHomePage } from './home-page.js';
import updatePost from '../logic/update-post.js';
import retrieveAvatar from '../logic/retrive-avatar.js';
import handleLikes from '../logic/like-posts.js';
import retrieveUser from '../logic/retrieve-user.js';

const addPostButton = getHomePage().querySelector('.add-post-button'),
  addPostPanel = getHomePage().querySelector('.add-post'),
  addPostForm = addPostPanel.querySelector('form'),
  postListPanel = getHomePage().querySelector('.post-list'),
  editPostPanel = getHomePage().querySelector('.edit-post'),
  editPostForm = editPostPanel.querySelector('form');

addPostButton.onclick = () => show(addPostPanel);

addPostForm.onsubmit = (event) => {
  event.preventDefault();

  const image = event.target.image.value,
    text = event.target.text.value;

  try {
    createPost(context.userId, image, text);

    hide(addPostPanel);

    renderPosts(context.userId);
  } catch (error) {
    alert(error.message);
  }
};

addPostForm.querySelector('.cancel').onclick = (event) => {
  event.preventDefault();

  addPostForm.reset();

  hide(addPostPanel);
};

editPostForm.onsubmit = (event) => {
  event.preventDefault();

  const postId = event.target.postId.value,
    image = event.target.image.value,
    text = event.target.text.value;

  try {
    updatePost(context.userId, postId, image, text);

    hide(editPostPanel);

    renderPosts();
  } catch (error) {
    alert(error.message);
  }
};

editPostForm.querySelector('.cancel').onclick = (event) => {
  event.preventDefault();

  editPostForm.reset();

  hide(editPostPanel);
};

const renderPosts = () => {
  try {
    const posts = retrievePosts(context.userId),
      user = retrieveUser(context.userId);

    postListPanel.innerHTML = '';

    posts.forEach((post) => {
      const postItem = document.createElement('article');
      postItem.classList.add('posts-users');

      const postHeader = document.createElement('div');
      postHeader.classList.add('post-header');

      const avatarAuthor = retrieveAvatar(post.author);

      const author = document.createElement('p');
      author.classList.add('post-author');
      author.innerText = post.authorName;

      const avatar = document.createElement('img');
      avatar.classList.add('post-avatar');
      avatar.src = avatarAuthor;

      postHeader.append(avatar, author);

      const image = document.createElement('img');
      image.classList.add('post-image');
      image.src = post.image;

      const text = document.createElement('p');
      text.classList.add('post-text');
      text.innerText = post.text;

      const date = document.createElement('time');
      date.innerText = post.date.toLocaleString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      const postLikesInfo = document.createElement('div');
      postLikesInfo.classList.add('post-likes-info');

      const buttonLike = document.createElement('button');
      const heartIcon = document.createElement('i');
      heartIcon.classList.add('far', 'fa-heart');
      buttonLike.classList.add('button-like');

      buttonLike.appendChild(heartIcon);

      if (post.likesUsers.includes(user.name)) {
        heartIcon.classList.add('fas');
      }

      buttonLike.onclick = () => {
        const postLikes = handleLikes(post.id, context.userId);
        const heartIcon = buttonLike.querySelector('.fa-heart');
        heartIcon.classList.toggle('fas');
        likesCount.innerText = postLikes.likesUsers.length;
        likesUsers.innerText = postLikes.likesUsers;
      };

      const likesUsers = document.createElement('p');
      likesUsers.classList.add('likes-users');
      likesUsers.innerText = post.likesUsers;

      const likesCount = document.createElement('p');
      likesCount.classList.add('likes-count');
      likesCount.innerText = post.likesCount;

      postLikesInfo.append(buttonLike, likesCount, likesUsers);

      if (post.author === context.userId) {
        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('button-edit');
        buttonEdit.innerText = 'Edit';

        buttonEdit.onclick = () => {
          editPostForm.querySelector('input[type=hidden]').value = post.id;
          editPostForm.querySelector('input[type=url]').value = post.image;
          editPostForm.querySelector('textarea').value = post.text;

          show(editPostPanel);
        };
        postItem.append(
          postHeader,
          image,
          buttonEdit,
          postLikesInfo,
          text,
          date
        );
      } else {
        postItem.append(postHeader, image, postLikesInfo, text, date);
      }

      postListPanel.appendChild(postItem);
    });

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export default renderPosts;
