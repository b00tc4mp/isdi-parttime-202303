import { findPostById } from '../logic/helpers/data-managers.js';
import updatePost from '../logic/update-post.js';
import renderPosts from '../pages/posts-page.js';
import { context, hide, show } from '../ui.js';

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

    hide(editPostPanel);
  };

  const foundPost = findPostById(post.id);
  if (!foundPost)
    throw new Error(`post with id: ${post.id} to edit, is not found`);

  editPostForm.querySelector('input[type=hidden]').value = post.id;
  editPostForm.querySelector('input[type=url]').value = post.image;
  editPostForm.querySelector('textarea').value = post.text;

  show(editPostPanel);

  return editPostPanel;
};

export default initEditPostPanel;
