import createPost from '../logic/create-posts.js';
import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';
import { show, hide } from '../ui.js';

const homePage = document.querySelector('.home');

const addPostButton = homePage.querySelector('.add-post-button');
const addPostPanel = homePage.querySelector('.add-post');
const postListPanel = homePage.querySelector('.post-list');
const addPostForm = addPostPanel.querySelector('form');

addPostButton.onclick = () => show(addPostPanel);

addPostForm.onsubmit = (event) => {
  event.preventDefault();

  const image = event.target.image.value;
  const text = event.target.text.value;

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
  } catch (error) {
    alert(error.message);
  }
};

export default renderPosts;
