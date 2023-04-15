import createPost from '../logic/create-posts.js';
import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';
import { show, hide } from '../ui.js';
import { getHomePage } from './home-page.js';
import updatePost from '../logic/update-post.js';
import retrieveAvatar from '../logic/retrive-avatar.js';
import handleLikes from '../logic/like-button.js';

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

export function renderPosts() {
  try {
    const posts = retrievePosts(context.userId);

    postListPanel.innerHTML = '';

    posts.forEach((post) => {
      const postItem = document.createElement('article'),
        avatarAuthor = retrieveAvatar(post.author);

      const author = document.createElement('p');
      author.innerText = post.authorName;

      const avatar = document.createElement('img');
      avatar.src = avatarAuthor;

      const image = document.createElement('img');
      image.src = post.image;

      const text = document.createElement('p');
      text.innerText = post.text;

      const date = document.createElement('time');
      date.innerText = post.date.toLocaleString();

      const button = document.createElement('button');
      button.innerText = 'like';

      const likesUsers = document.createElement('p');
      likesUsers.innerText = post.likesUsers;

      const likesCount = document.createElement('p');
      likesCount.innerText = post.likesCount;

      if (post.author === context.userId) {
        const button = document.createElement('button');
        button.innerText = 'Edit';

        button.onclick = () => {
          editPostForm.querySelector('input[type=hidden]').value = post.id;
          editPostForm.querySelector('input[type=url]').value = post.image;
          editPostForm.querySelector('textarea').value = post.text;

          show(editPostPanel);
        };
      } else {
        button.onclick = () => {
          const postLikes = handleLikes(post.id, context.userId);
          likesCount.innerText = postLikes.likesUsers.length;
          likesUsers.innerText = postLikes.likesUsers;
        };
      }
      postItem.append(
        author,
        avatar,
        image,
        text,
        date,
        button,
        likesUsers,
        likesCount
      );

      postListPanel.appendChild(postItem);
    });

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
}

export default renderPosts;
