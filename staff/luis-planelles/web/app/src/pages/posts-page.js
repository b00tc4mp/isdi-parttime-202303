import createPost from '../logic/create-posts.js';
import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';
import { show, hide } from '../ui.js';

const homePage = document.querySelector('.home'),
  addPostButton = homePage.querySelector('.add-post-button'),
  addPostPanel = homePage.querySelector('.add-post'),
  addPostForm = addPostPanel.querySelector('form'),
  postListPanel = homePage.querySelector('.post-list');

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

const renderPosts = (userId) => {
  try {
    const posts = retrievePosts(userId);

    postListPanel.innerHTML = posts.reduce((accum, post) => {
      return (
        accum +
        `<article>
          <img src="${post.image}">
          <p>${post.text}</p>
          <time>${post.date.toLocaleString()}</time>
      </article>`
      );
    }, '');

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export default renderPosts;
