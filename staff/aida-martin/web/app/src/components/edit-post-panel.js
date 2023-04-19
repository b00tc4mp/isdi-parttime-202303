import updatePost from "../logic/update-post.js";
import { context, hide } from "../ui.js";
import errorShow from "../logic/helpers/error-managers.js";
import { bodyPage } from "../pages/home-page.js";

export default function initEditPostPanel(homePage, renderPosts) {
  const editPostModal = homePage.querySelector(".edit-post-modal");
  const editPostForm = homePage.querySelector(".edit-post-form");
  const editPostError = homePage.querySelector(".edit-post-error");

  editPostForm.onsubmit = (event) => {
    event.preventDefault();

    const post = event.target.postId.value;
    const image = event.target.image.value;
    const text = event.target.text.value;

    try {
      updatePost(context.userId, post, image, text);

      renderPosts();

      editPostForm.reset();

      bodyPage.classList.remove("scroll-lock");
      hide(editPostModal);
    } catch (error) {
      errorShow(editPostError, error);
    }
  };

  editPostForm.querySelector(".cancel").onclick = (event) => {
    event.preventDefault();

    editPostForm.reset();

    bodyPage.classList.remove("scroll-lock");
    hide(editPostModal);
  };
  return { editPostModal, editPostForm };
}
