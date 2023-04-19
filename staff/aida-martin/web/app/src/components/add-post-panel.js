import createPost from "../logic/create-post.js";
import { context, hide } from "../ui.js";
import errorShow from "../logic/helpers/error-managers.js";
import { bodyPage } from "../pages/home-page.js";

export default function initAddPostPanel(homePage, renderPosts) {
  const addPostModal = homePage.querySelector(".modal");
  const addPostForm = homePage.querySelector(".posts");
  const addPostError = homePage.querySelector(".add-post-error");

  addPostForm.onsubmit = (event) => {
    event.preventDefault();

    const image = event.target.image.value;
    const text = event.target.text.value;

    try {
      createPost(context.userId, image, text);

      renderPosts();

      addPostForm.reset();

      bodyPage.classList.remove("scroll-lock");
      hide(addPostModal);
    } catch (error) {
      errorShow(addPostError, error);
    }
  };

  addPostForm.querySelector(".cancel").onclick = (event) => {
    event.preventDefault();

    addPostForm.reset();

    bodyPage.classList.remove("scroll-lock");
    hide(addPostModal);
  };

  return addPostModal;
}
