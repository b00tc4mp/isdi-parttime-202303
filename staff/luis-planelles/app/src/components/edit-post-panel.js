import updatePost from '../logic/update-post.js';
import renderPosts from '../pages/posts-page.js';
import { context } from '../ui.js';
import getEditPost from './helpers/get-edit-post.js';

const initEditPostPanel = (homePage, post) => {
  const editPostPanel = homePage.querySelector('.edit-post'),
    editPostForm = editPostPanel.querySelector('form');

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

    // hide(editPostPanel);
  };

  try {
    getEditPost(post, editPostForm);
    // show(editPostPanel);
  } catch (error) {
    alert(error.message);
  }

  return editPostPanel;
};

export default initEditPostPanel;
