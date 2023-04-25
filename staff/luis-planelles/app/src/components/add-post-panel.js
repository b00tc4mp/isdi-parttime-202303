import createPost from '../logic/create-posts.js';
import { context, hide } from '../ui.js';

const initAddPostPanel = (homePage) => {
  const addPostPanel = homePage.querySelector('.add-post');
  const addPostForm = addPostPanel.querySelector('form');

  addPostForm.onsubmit = (event) => {
    event.preventDefault();

    const image = event.target.image.value;
    const text = event.target.text.value;

    try {
      createPost(context.userId, image, text);

      hide(addPostPanel);

      renderPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  addPostForm.querySelector('.cancel').onclick = (event) => {
    event.preventDefault();

    addPostForm.reset();

    hide(addPostPanel);
  };

  return addPostPanel;
};

export default initAddPostPanel;
